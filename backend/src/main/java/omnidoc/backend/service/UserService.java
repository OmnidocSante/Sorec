package omnidoc.backend.service;


import omnidoc.backend.entity.enums.Role;
import omnidoc.backend.entity.enums.Status;
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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    @Autowired
    public JwtService jwtService;
    @Autowired
    public UserDetailsService userDetailsService;
    @Autowired
    public AuthenticationManager authenticationManager;
    @Autowired
    public PasswordEncoder passwordEncoder;

    @Autowired
    public UserRepo userRepo;
    @Autowired
    public JockeyRepo jockeyRepo;
    @Autowired
    public MedecinRepo medecinRepo;

    public List<UserRecord> getUsers() {
        return userRepo.findAll().stream().map(user -> new UserRecord(user.getId(), user.getNom(), user.getPrénom(), user.getSexe(), user.getDateNaissance(), user.getCinId(), user.getAdresse(), user.getTelephone(), user.getEmail(), user.getSorecId(), user.getRole())).toList();
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


        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        User createdUser = userRepo.save(user);
        if (user.getRole() == Role.JOCKEY) {
            jockeyRepo.save(new Jockey(createdUser));

        } else if (user.getRole() == Role.MEDECIN) {
            medecinRepo.save(new Medecin(createdUser));
        }

    }

    @Transactional
    public void modifyUser(ModificationUserRequest user, int userId) {
        User foundUser = userRepo.findById(userId).orElseThrow(() -> new ApiException("User not found"));

        boolean isRoleChanging = !foundUser.getRole().name().equals(user.getRole().name());

        foundUser.setEmail(user.getEmail());
        foundUser.setRole(user.getRole());
        foundUser.setSexe(user.getSexe());
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
}
