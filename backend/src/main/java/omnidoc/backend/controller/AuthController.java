package omnidoc.backend.controller;

import jakarta.validation.Valid;
import omnidoc.backend.entity.users.User;
import omnidoc.backend.response.AuthenticationResponse;
import omnidoc.backend.service.AuthenticationService;
import omnidoc.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User user) {
        return ResponseEntity.ok(authenticationService.login(user));
    }


    @PatchMapping("/create-password")
    public ResponseEntity<Void> createPassword(@RequestParam("token") String token, @RequestBody HashMap<String, String> requestBody) throws Exception {
        String password = requestBody.get("password");
        userService.createPassword(token, password);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @PatchMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestParam("token") String token, @RequestBody HashMap<String, String> requestBody) throws Exception {
        String password = requestBody.get("password");
        userService.resetPassword(token, password);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @PostMapping("/request-password-reset")
    public ResponseEntity<Void> sendResetToken(@RequestBody HashMap<String, String> requestBody) {
        String email = requestBody.get("email");
        userService.sendResetCode(email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
