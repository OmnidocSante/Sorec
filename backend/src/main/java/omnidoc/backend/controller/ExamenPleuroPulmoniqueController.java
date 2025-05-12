package omnidoc.backend.controller;

import omnidoc.backend.entity.examens.ExamenPleuroPulmonaire;
import omnidoc.backend.service.ExamenPleuroPulmonaireService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@PreAuthorize("hasAuthority('MEDECIN')")

@RestController
@RequestMapping("/api/jockey/{jockeyId}/examen-pleuro")
public class ExamenPleuroPulmoniqueController {
    private final ExamenPleuroPulmonaireService examenPleuroPulmonaireService;

    public ExamenPleuroPulmoniqueController(ExamenPleuroPulmonaireService examenPleuroPulmonaireService) {
        this.examenPleuroPulmonaireService = examenPleuroPulmonaireService;
    }

    @GetMapping
    public ResponseEntity<ExamenPleuroPulmonaire> fetchExamenPleuro(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(examenPleuroPulmonaireService.fetchExamenPleuroPulmonique(jockeyId));
    }

    @GetMapping("/historique/{dossierId}")
    public ResponseEntity<ExamenPleuroPulmonaire> fetchExamenPleuroByDossierId(@PathVariable int dossierId) throws Exception {
        return ResponseEntity.ok(examenPleuroPulmonaireService.fetchExamenPleuroPulmoniqueByDossier(dossierId));
    }

    @PutMapping
    public ResponseEntity<Void> updateExamenPleuro(@PathVariable int jockeyId, @RequestBody ExamenPleuroPulmonaire examenPleuroPulmonaire) throws Exception {
        examenPleuroPulmonaireService.updateExamenPleuroPulmonique(jockeyId, examenPleuroPulmonaire);
        return ResponseEntity.ok().build();
    }


}
