package omnidoc.backend.controller;

import omnidoc.backend.entity.users.User;
import omnidoc.backend.response.AuthenticationResponse;
import omnidoc.backend.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    public AuthenticationService authenticationService;

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody User user) {
        return authenticationService.login(user);
    }

    @PostMapping("/signin")
    public AuthenticationResponse create(@RequestBody User user) {
        return authenticationService.createUser(user);
    }

}
