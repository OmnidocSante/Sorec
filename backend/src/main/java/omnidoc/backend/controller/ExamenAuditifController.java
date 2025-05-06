package omnidoc.backend.controller;

import omnidoc.backend.entity.examens.ExamenAuditif;
import omnidoc.backend.service.ExamenAuditifService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping
    public ResponseEntity<Void> updateExamenAuditif(@PathVariable int jockeyId, @RequestBody ExamenAuditif examenAuditif) throws Exception {
        examenAuditifService.updateExamenAuditif(jockeyId, examenAuditif);
        return ResponseEntity.ok().build();
    }
}
