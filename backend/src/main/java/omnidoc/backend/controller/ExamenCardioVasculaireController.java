package omnidoc.backend.controller;

import omnidoc.backend.entity.examens.ExamenCardioVasculaire;
import omnidoc.backend.service.ExamenCardioVasculaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@PreAuthorize("hasAuthority('MEDECIN')")

@RestController
@RequestMapping("/api/jockey/{jockeyId}/examen-cardio")
public class ExamenCardioVasculaireController {
    @Autowired
    private ExamenCardioVasculaireService examenCardioVasculaireService;

    @GetMapping
    public ResponseEntity<ExamenCardioVasculaire> fetchExamCardio(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(examenCardioVasculaireService.getExamenByPatientId(jockeyId));
    }

    @GetMapping("/historique/{dossierId}")
    public ResponseEntity<ExamenCardioVasculaire> fetchExamCardioByDossierId(@PathVariable int dossierId) throws Exception {
        return ResponseEntity.ok(examenCardioVasculaireService.getExamenByDossierId(dossierId));
    }

    @PutMapping
    public ResponseEntity<Void> changeExamCardio(@PathVariable int jockeyId, @RequestBody ExamenCardioVasculaire examenCardioVasculaire) throws Exception {
        examenCardioVasculaireService.modifyExamenByPatientId(jockeyId, examenCardioVasculaire);
        return ResponseEntity.ok().build();
    }
}
