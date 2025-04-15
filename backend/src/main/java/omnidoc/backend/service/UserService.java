package omnidoc.backend.service;


import omnidoc.backend.entity.enums.Role;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.Medecin;
import omnidoc.backend.entity.users.User;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.records.UserRecord;
import omnidoc.backend.repository.JockeyRepo;
import omnidoc.backend.repository.MedecinRepo;
import omnidoc.backend.repository.UserRepo;
import omnidoc.backend.request.ModificationUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        User createdUser = userRepo.save(user);

        String subject = "Création de votre mot de passe";
        String body = "Bonjour,\n\n" + "Un compte vient d'être créé pour vous sur notre plateforme.\n" + "Veuillez cliquer sur le lien suivant pour définir votre mot de passe :\n\n" + "http://localhost:5173/create-password?token=" + createdUser.getPasswordCreationToken() + "\n\n";

        emailService.sendEmail(user.getEmail(), subject, body);


        if (user.getRole() == Role.JOCKEY) {
            jockeyRepo.save(new Jockey(createdUser));

        } else if (user.getRole() == Role.MEDECIN) {
            medecinRepo.save(new Medecin(createdUser));
        }

    }

    public void createPassword(String token, String password) {
        User user = userRepo.findByPasswordCreationToken(token).orElseThrow(() -> new ApiException("token not valid"));
        String hashedPassword = passwordEncoder.encode(password);
        user.setPassword(hashedPassword);
        user.setPasswordCreationToken(UUID.randomUUID().toString());
        userRepo.save(user);
    }

    @Transactional
    public void modifyUser(ModificationUserRequest user, int userId) {
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
