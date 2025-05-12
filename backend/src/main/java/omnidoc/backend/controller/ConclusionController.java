package omnidoc.backend.controller;

import omnidoc.backend.entity.resultat.Conclusion;
import omnidoc.backend.service.ConclusionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;



@PreAuthorize("hasAuthority('MEDECIN')")

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
    @GetMapping("/historique/{dossierId}")
    public ResponseEntity<Conclusion> fetchConclusionByDossierId(@PathVariable int dossierId) throws Exception {
        return ResponseEntity.ok(conclusionService.fetchConclusionByDossierId(dossierId));
    }

    @PutMapping
    public ResponseEntity<Void> updateConclusion(@PathVariable int jockeyId, @RequestBody Conclusion conclusion) throws Exception {
        conclusionService.updateConclusion(jockeyId, conclusion);
        return ResponseEntity.ok().build();
    }
}
