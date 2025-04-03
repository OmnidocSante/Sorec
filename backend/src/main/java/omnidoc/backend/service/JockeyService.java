package omnidoc.backend.service;

import omnidoc.backend.repository.JockeyRepo;
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


}
