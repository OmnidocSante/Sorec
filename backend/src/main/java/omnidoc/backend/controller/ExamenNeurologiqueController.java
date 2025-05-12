package omnidoc.backend.controller;

import omnidoc.backend.entity.examens.ExamenNeurologique;
import omnidoc.backend.service.ExamenNeurologiqueService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@PreAuthorize("hasAuthority('MEDECIN')")

@RestController
@RequestMapping("/api/jockey/{jockeyId}/examen-neurologique")
public class ExamenNeurologiqueController {
    private final ExamenNeurologiqueService examenNeurologiqueService;

    public ExamenNeurologiqueController(ExamenNeurologiqueService examenNeurologiqueService) {
        this.examenNeurologiqueService = examenNeurologiqueService;
    }

    @GetMapping
    public ResponseEntity<ExamenNeurologique> fetchExamenNeurologique(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(examenNeurologiqueService.fetchExamenPleuroPulmonique(jockeyId));
    }
    @GetMapping("/historique/{dossierId}")
    public ResponseEntity<ExamenNeurologique> fetchExamenNeurologiqueByDossierId(@PathVariable int dossierId) throws Exception {
        return ResponseEntity.ok(examenNeurologiqueService.fetchExamenPleuroPulmoniqueByDossierId(dossierId));
    }
    @PutMapping
    public ResponseEntity<Void> updateExamenNeurologique(@PathVariable int jockeyId,@RequestBody ExamenNeurologique examenNeurologique) throws Exception {
        examenNeurologiqueService.updateExamenNeurologique(jockeyId,examenNeurologique);
        return ResponseEntity.ok().build();
    }
}
