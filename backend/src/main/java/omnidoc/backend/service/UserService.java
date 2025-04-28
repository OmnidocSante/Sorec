package omnidoc.backend.service;


import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.entity.antecent_personnel.Condition;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.enums.Role;
import omnidoc.backend.entity.examens.ExamenCardioVasculauire;
import omnidoc.backend.entity.examens.ExamenParametres;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.Medecin;
import omnidoc.backend.entity.users.User;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.records.UserRecord;
import omnidoc.backend.repository.*;
import omnidoc.backend.request.ModificationUserRequest;
import omnidoc.backend.util.HmacUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JockeyRepo jockeyRepo;
    @Autowired
    private MedecinRepo medecinRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AntecedentPersonnelRepo antecedentPersonnelRepo;

    @Autowired
    private DossierMedicaleRepo dossierMedicaleRepo;
    @Autowired
    private ConditionRepo conditionRepo;

    public List<UserRecord> getUsers() {
        return userRepo.findAll().stream().map(user -> new UserRecord(user.getId(), user.getNom(), user.getPrénom(), user.getSexe(), user.getDateNaissance(), user.getCinId(), user.getVille(), user.getAdresse(), user.getTelephone(), user.getEmail(), user.getSorecId(), user.getRole())).toList();
    }

    public void createUser(User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new ApiException("Cet email est déjà utilisé");
        }

        if (userRepo.existsByCinId(user.getCinId())) {
            throw new ApiException("Ce numéro CIN est déjà enregistré");
        }

        if (userRepo.existsBySorecId(user.getSorecId())) {
            throw new ApiException("Ce SOREC ID est déjà utilisé");
        }

        if (userRepo.existsByTelephone(user.getTelephone())) {
            throw new ApiException("Ce numéro de téléphone est déjà associé à un compte");
        }
        if (userRepo.existsByNomAndPrénom(user.getNom(), user.getPrénom())) {
            throw new ApiException("Un compte avec ce nom et prénom est déjà enregistré");
        }

        String rawPasswordCreationToken = UUID.randomUUID().toString();

        String encryptedToken = HmacUtil.hmac(rawPasswordCreationToken);

        user.setPasswordCreationToken(encryptedToken);

        User createdUser = userRepo.save(user);

        String subject = "Création de votre mot de passe";
        String body = "Bonjour,\n\n" + "Un compte vient d'être créé pour vous sur notre plateforme.\n" + "Veuillez cliquer sur le lien suivant pour définir votre mot de passe :\n\n" + "http://localhost:5173/create-password?token=" + rawPasswordCreationToken + "\n\n";

        emailService.sendEmail(user.getEmail(), subject, body);

        if (user.getRole() == Role.JOCKEY) {
            Jockey jockey = new Jockey();
            jockey.setUser(createdUser);
            jockeyRepo.save(jockey);

            DossierMedicale dossierMedicale = new DossierMedicale();
            dossierMedicale.setJockey(jockey);
            dossierMedicale.setIsCurrent(true);
            dossierMedicaleRepo.save(dossierMedicale);

            List<Condition> conditions = conditionRepo.findAll();
            List<AntecedentPersonnel> defaultAntecedents = new ArrayList<>();

            for (Condition c : conditions) {
                AntecedentPersonnel ap = new AntecedentPersonnel();
                ap.setCondition(c);
                ap.setDossierMedicale(dossierMedicale);
                ap.setHasCondition(false);
                ap.setRemarques(null);
                defaultAntecedents.add(ap);
            }

            antecedentPersonnelRepo.saveAll(defaultAntecedents);





        } else if (user.getRole() == Role.MEDECIN) {
            medecinRepo.save(new Medecin(createdUser));
        }
    }


    public void createPassword(String rawToken, String password) throws ApiException {
        if (rawToken == null || rawToken.isEmpty()) {
            throw new ApiException("Token manquant");

        }
        String hashedToken = HmacUtil.hmac(rawToken);

        User user = userRepo.findByPasswordCreationToken(hashedToken).orElseThrow(() -> new ApiException("Token invalide"));

        user.setPassword(passwordEncoder.encode(password));
        user.setPasswordCreationToken(null);

        userRepo.save(user);
    }

    public void resetPassword(String rawToken, String password) throws ApiException {
        if (rawToken == null || rawToken.isEmpty()) {
            throw new ApiException("Token manquant");

        }

        String hashedToken = HmacUtil.hmac(rawToken);

        User user = userRepo.findByPasswordResetToken(hashedToken).orElseThrow(() -> new ApiException("Token invalide"));

        user.setPassword(passwordEncoder.encode(password));

        user.setPasswordResetToken(null);

        userRepo.save(user);
    }

    public void sendResetCode(String email) throws ApiException {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new ApiException("Aucun utilisateur trouvé avec cet email"));

        String rawToken = UUID.randomUUID().toString();
        user.setPasswordResetToken(HmacUtil.hmac(rawToken));
        userRepo.save(user);

        String resetLink = "http://localhost:5173/reset-password?token=" + rawToken;
        String body = "Bonjour,\n\nNous avons reçu une demande de réinitialisation...\n" + resetLink + "\n\nCordialement,\nL'équipe.";
        emailService.sendEmail(email, "Réinitialisation de votre mot de passe", body);
    }

    @Transactional
    public void modifyUser(ModificationUserRequest user, int userId) {
        System.out.println(user.getVille());

        User foundUser = userRepo.findById(userId).orElseThrow(() -> new ApiException("User not found"));
        boolean isRoleChanging = !foundUser.getRole().name().equals(user.getRole().name());


        foundUser.setEmail(user.getEmail());
        foundUser.setRole(user.getRole());
        foundUser.setSexe(user.getSexe());
        foundUser.setVille(user.getVille());
        foundUser.setAdresse(user.getAdresse());
        User savedUser = userRepo.save(foundUser);
        if (isRoleChanging && (user.getRole() == Role.MEDECIN || user.getRole() == Role.JOCKEY)) {
            if (user.getRole() == Role.MEDECIN) {
                jockeyRepo.deleteByUser_Id(userId);
                medecinRepo.save(new Medecin(savedUser));
            } else {
                medecinRepo.deleteByUser_Id(userId);
                jockeyRepo.save(new Jockey(savedUser));
            }
        }
    }


    public void deleteUser(int userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new ApiException("User not found"));
        Role role = user.getRole();
        if (role.name().equals(Role.MEDECIN.name())) {
            medecinRepo.deleteByUser_Id(userId);
        } else if (role.name().equals(Role.JOCKEY.name())) {
            jockeyRepo.deleteByUser_Id(userId);
        }
        userRepo.deleteById(userId);
    }
}
