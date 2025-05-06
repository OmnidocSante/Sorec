package omnidoc.backend.controller;

import omnidoc.backend.entity.resultat.Conclusion;
import omnidoc.backend.service.ConclusionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/conclusion")
public class ConclusionController {
    private final ConclusionService conclusionService;

    public ConclusionController(ConclusionService conclusionService) {
        this.conclusionService = conclusionService;
    }

    @GetMapping
    public ResponseEntity<Conclusion> fetchConclusion(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(conclusionService.fetchConclusion(jockeyId));
    }

    @PutMapping
    public ResponseEntity<Void> updateConclusion(@PathVariable int jockeyId, @RequestBody Conclusion conclusion) throws Exception {
        conclusionService.updateConclusion(jockeyId, conclusion);
        return ResponseEntity.ok().build();
    }
}
