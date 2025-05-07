package omnidoc.backend.controller;

import omnidoc.backend.entity.examens.ExamenLocomoteur;
import omnidoc.backend.service.ExamenLocomoteurService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/examen-locomoteur")
public class ExamenLocomoteurController {
    private final ExamenLocomoteurService examenLocomoteurService;

    public ExamenLocomoteurController(ExamenLocomoteurService examenLocomoteurService) {
        this.examenLocomoteurService = examenLocomoteurService;
    }

    @GetMapping
    public ResponseEntity<ExamenLocomoteur> fetchExamenLocomoteur(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(examenLocomoteurService.fetchExamenLocomoteur(jockeyId));
    }
    @GetMapping("/historique/{dossierId}")
    public ResponseEntity<ExamenLocomoteur> fetchExamenLocomoteurByDossierId(@PathVariable int dossierId) throws Exception {
        return ResponseEntity.ok(examenLocomoteurService.fetchExamenLocomoteurByDossierId(dossierId));
    }

    @PutMapping
    public ResponseEntity<Void> updateExamenLocomoteur(@PathVariable int jockeyId, @RequestBody ExamenLocomoteur examenLocomoteur) throws Exception {
        examenLocomoteurService.updateExamenLocomoteur(jockeyId, examenLocomoteur);
        return ResponseEntity.ok().build();
    }
}
