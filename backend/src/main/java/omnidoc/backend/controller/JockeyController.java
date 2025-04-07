package omnidoc.backend.controller;

import omnidoc.backend.entity.users.User;
import omnidoc.backend.records.UserRecord;
import omnidoc.backend.service.JockeyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jockeys")
public class JockeyController {
    @Autowired
    public JockeyService jockeyService;

    @GetMapping
    public ResponseEntity<List<UserRecord>> getJockeys() {
        return ResponseEntity.ok(jockeyService.getJockeys());
    }


}
