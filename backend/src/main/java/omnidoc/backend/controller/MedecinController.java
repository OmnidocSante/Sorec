package omnidoc.backend.controller;


import omnidoc.backend.records.UserRecord;
import omnidoc.backend.service.MedecinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@PreAuthorize("hasAnyAuthority('MEDECIN','ADMIN')")
@RestController
@RequestMapping("/api/medecins")
public class MedecinController {
    @Autowired
    private MedecinService medecinService;

    @GetMapping
    public ResponseEntity<List<UserRecord>> getMedecins() {
        return ResponseEntity.ok(medecinService.getMedecins());
    }
}
