package omnidoc.backend.controller;

import omnidoc.backend.entity.examens.ExamenNeurologique;
import omnidoc.backend.service.ExamenNeurologiqueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping
    public ResponseEntity<Void> updateExamenNeurologique(@PathVariable int jockeyId,@RequestBody ExamenNeurologique examenNeurologique) throws Exception {
        examenNeurologiqueService.updateExamenNeurologique(jockeyId,examenNeurologique);
        return ResponseEntity.ok().build();
    }
}
