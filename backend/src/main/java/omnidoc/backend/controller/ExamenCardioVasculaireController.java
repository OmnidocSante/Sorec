package omnidoc.backend.controller;

import omnidoc.backend.entity.examens.ExamenCardioVasculaire;
import omnidoc.backend.service.ExamenCardioVasculaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/examen-cardio")
public class ExamenCardioVasculaireController {
    @Autowired
    private ExamenCardioVasculaireService examenCardioVasculaireService;

    @GetMapping
    public ResponseEntity<ExamenCardioVasculaire> fetchExamCardio(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(examenCardioVasculaireService.getExamenByPatientId(jockeyId));
    }

    @PutMapping
    public ResponseEntity<Void> changeExamCardio(@PathVariable int jockeyId, @RequestBody ExamenCardioVasculaire examenCardioVasculaire) throws Exception {
        examenCardioVasculaireService.modifyExamenByPatientId(jockeyId, examenCardioVasculaire);
        return ResponseEntity.ok().build();
    }
}
