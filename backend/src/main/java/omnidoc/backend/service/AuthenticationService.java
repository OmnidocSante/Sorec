package omnidoc.backend.service;

import omnidoc.backend.entity.users.User;
import omnidoc.backend.repository.UserRepo;
import omnidoc.backend.response.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {
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

    public AuthenticationResponse login(User user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

        User authenticatedUser = userRepo.findByEmail(user.getEmail()).orElseThrow();
        Map<String, Object> role = new HashMap<>();
        role.put("role", authenticatedUser.getRole());

        String token = jwtService.generateToken(role, authenticatedUser);

        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse createUser(User user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        User savedUser = userRepo.save(user);
        Map<String, Object> role = new HashMap<>();
        role.put("role", savedUser.getRole());

        String token = jwtService.generateToken(role, savedUser);
        return new AuthenticationResponse(token);
    }

}
