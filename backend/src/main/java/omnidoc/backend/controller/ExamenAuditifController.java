package omnidoc.backend.controller;

import omnidoc.backend.entity.examens.ExamenAuditif;
import omnidoc.backend.service.ExamenAuditifService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@PreAuthorize("hasAuthority('MEDECIN')")
@RestController
@RequestMapping("/api/jockey/{jockeyId}/examen-auditif")
public class ExamenAuditifController {
    private final ExamenAuditifService examenAuditifService;

    public ExamenAuditifController(ExamenAuditifService examenAuditifService) {
        this.examenAuditifService = examenAuditifService;
    }

    @GetMapping
    public ResponseEntity<ExamenAuditif> fetchExamenAuditif(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(examenAuditifService.fetchExamenAuditif(jockeyId));
    }
    @GetMapping("/historique/{dossierId}")
    public ResponseEntity<ExamenAuditif> fetchExamenAuditifByDossierId(@PathVariable int dossierId) throws Exception {
        return ResponseEntity.ok(examenAuditifService.fetchExamenAuditifByDossierId(dossierId));
    }

    @PutMapping
    public ResponseEntity<Void> updateExamenAuditif(@PathVariable int jockeyId, @RequestBody ExamenAuditif examenAuditif) throws Exception {
        examenAuditifService.updateExamenAuditif(jockeyId, examenAuditif);
        return ResponseEntity.ok().build();
    }
}
