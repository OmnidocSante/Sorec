package omnidoc.backend.service;

import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.User;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.JockeyRepo;
import omnidoc.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JockeyService {
    @Autowired
    public JockeyRepo jockeyRepo;
    @Autowired
    public UserService userService;
    @Autowired
    public PasswordEncoder passwordEncoder;

    public void createJockey(User user) {
        User createdUser = userService.createUser(user);
        Jockey jockey = new Jockey(createdUser);
        jockeyRepo.save(jockey);

    }
}
