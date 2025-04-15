package omnidoc.backend.service;

import omnidoc.backend.entity.users.User;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.UserRepo;
import omnidoc.backend.response.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class AuthenticationService {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepo userRepo;

    public AuthenticationResponse login(User user) {
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new ApiException("Mot de passe non encore créé. Un email contenant un lien de création de mot de passe vous a été envoyé. Veuillez consulter votre boîte mail.");
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
        } catch (Exception e) {
            throw new ApiException("Email ou mot de passe invalide.");
        }

        User authenticatedUser = userRepo.findByEmail(user.getEmail())
                .orElseThrow(() -> new ApiException("Utilisateur introuvable."));

        Map<String, Object> role = new HashMap<>();
        role.put("role", authenticatedUser.getRole());

        String token = jwtService.generateToken(role, authenticatedUser);

        return new AuthenticationResponse(token);
    }


}
