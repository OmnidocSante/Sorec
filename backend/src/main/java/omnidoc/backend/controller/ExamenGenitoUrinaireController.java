package omnidoc.backend.controller;

import omnidoc.backend.entity.examens.ExamenGenitoUrinaire;
import omnidoc.backend.service.ExamenGenitoUrinaireService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/examen-genito-urinaire")
public class ExamenGenitoUrinaireController {
    private final ExamenGenitoUrinaireService examenGenitoUrinaireService;

    public ExamenGenitoUrinaireController(ExamenGenitoUrinaireService examenGenitoUrinaireService) {
        this.examenGenitoUrinaireService = examenGenitoUrinaireService;
    }

    @GetMapping
    public ResponseEntity<ExamenGenitoUrinaire> fetchExamenNeurologique(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(examenGenitoUrinaireService.fetchExamenGenitoUrinaire(jockeyId));
    }

    @PostMapping
    public ResponseEntity<Void> updateExamenGenitoUrinaire(@PathVariable int jockeyId, @RequestBody ExamenGenitoUrinaire examenGenitoUrinaire) throws Exception {
        examenGenitoUrinaireService.updateExamenGenitoUrinaire(jockeyId, examenGenitoUrinaire);
        return ResponseEntity.ok().build();
    }
}
