package omnidoc.backend.controller;

import omnidoc.backend.entity.dossier.Hygiene;
import omnidoc.backend.service.HygieneService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/hygiene")
public class HygieneController {
    private final HygieneService hygieneService;

    public HygieneController(HygieneService hygieneService) {
        this.hygieneService = hygieneService;
    }

    @GetMapping
    public ResponseEntity<Hygiene> fetchHygiene(@PathVariable  int jockeyId) throws Exception {
        return ResponseEntity.ok(hygieneService.fetchHygieneByPatientId(jockeyId));
    }

    @PutMapping
    public ResponseEntity<Void> updateHygiene(@PathVariable  int jockeyId,@RequestBody  Hygiene hygiene) throws Exception {
        hygieneService.modifyHygiene(jockeyId,hygiene);
        return ResponseEntity.ok().build();
    }
}
