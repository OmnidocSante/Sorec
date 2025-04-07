package omnidoc.backend.controller;


import jakarta.validation.Valid;
import omnidoc.backend.entity.users.User;
import omnidoc.backend.records.UserRecord;
import omnidoc.backend.request.ModificationUserRequest;
import omnidoc.backend.response.AuthenticationResponse;
import omnidoc.backend.service.AuthenticationService;
import omnidoc.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    public UserService userService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> create(@RequestBody @Valid User user) {
        userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UserRecord>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PatchMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> changeUser(@RequestBody @Valid ModificationUserRequest user, @PathVariable int userId) {
        userService.modifyUser(user, userId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @DeleteMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
