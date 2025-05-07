package omnidoc.backend.controller;

import omnidoc.backend.entity.examens.ExamenAbdominal;
import omnidoc.backend.service.ExamenAbdominalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/examen-abdominal")
public class ExamenAbdominalController {

    private final ExamenAbdominalService examenAbdominalService;

    public ExamenAbdominalController(ExamenAbdominalService examenAbdominalService) {
        this.examenAbdominalService = examenAbdominalService;
    }

    @GetMapping
    public ResponseEntity<ExamenAbdominal> fetchExamenNeurologique(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(examenAbdominalService.fetchExamenAbdominal(jockeyId));
    }

    @GetMapping("/historique/{dossierId}")
    public ResponseEntity<ExamenAbdominal> fetchExamenNeurologiqueByDossierId(@PathVariable int dossierId) throws Exception {
        return ResponseEntity.ok(examenAbdominalService.fetchExamenAbdominalByDossierId(dossierId));
    }

    @PutMapping
    public ResponseEntity<Void> updateExamenNeurologique(@PathVariable int jockeyId, @RequestBody ExamenAbdominal examenAbdominal) throws Exception {
        examenAbdominalService.updateExamenAbdominal(jockeyId, examenAbdominal);
        return ResponseEntity.ok().build();
    }
}