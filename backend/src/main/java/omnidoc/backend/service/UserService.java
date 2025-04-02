package omnidoc.backend.service;


import ch.qos.logback.classic.spi.IThrowableProxy;
import omnidoc.backend.entity.users.User;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.records.UserRecord;
import omnidoc.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public List<UserRecord> getUsers() {
        return userRepo.findAll().stream().map(user -> new UserRecord(user.getId(), user.getNom(), user.getPrénom(), user.getSexe(), user.getDateNaissance(), user.getCinId(), user.getAdresse(), user.getTelephone(), user.getEmail(), user.getSorecId(), user.getRole())).toList();
    }


    public User createUser(User user) {
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
        return userRepo.save(user);

    }

    public void modifyUser(User user) {
        User foundUser = userRepo.findById(user.getId()).orElseThrow(() -> new ApiException("User not found"));
        foundUser.setEmail(user.getEmail());
        foundUser.setRole(user.getRole());
        foundUser.setSexe(user.getSexe());
        foundUser.setAdresse(user.getAdresse());
        userRepo.save(foundUser);
    }

}
