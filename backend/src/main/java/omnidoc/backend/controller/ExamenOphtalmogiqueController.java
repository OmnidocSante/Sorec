package omnidoc.backend.controller;

import omnidoc.backend.entity.examens.ExamenOphtalmogique;
import omnidoc.backend.service.ExamenOphtalmogiqueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/examen-ophtalmogique")
public class ExamenOphtalmogiqueController {
    private final ExamenOphtalmogiqueService examenOphtalmogiqueService;

    public ExamenOphtalmogiqueController(ExamenOphtalmogiqueService examenOphtalmogiqueService) {
        this.examenOphtalmogiqueService = examenOphtalmogiqueService;
    }

    @GetMapping
    public ResponseEntity<ExamenOphtalmogique> fetchExamen(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(examenOphtalmogiqueService.fetchExamenOphtalmogique(jockeyId));
    }

    @PostMapping
    public ResponseEntity<Void> updateExamen(@PathVariable int jockeyId,@RequestBody ExamenOphtalmogique examenOphtalmogique) throws Exception {
        examenOphtalmogiqueService.updateExamenOphtalmogique(jockeyId, examenOphtalmogique);
        return ResponseEntity.ok().build();
    }


}
