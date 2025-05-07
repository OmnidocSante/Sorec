package omnidoc.backend.controller;

import omnidoc.backend.entity.examens.electrocardiogrammes.ElectrocardiogrammeRepos;
import omnidoc.backend.service.ElectrocardiogrammeReposService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/electrocardiogramme-repos")
public class ElectrodiogrammeReposController {
    private final ElectrocardiogrammeReposService electrocardiogrammeReposService;

    public ElectrodiogrammeReposController(ElectrocardiogrammeReposService electrocardiogrammeReposService) {
        this.electrocardiogrammeReposService = electrocardiogrammeReposService;
    }

    @GetMapping
    public ResponseEntity<ElectrocardiogrammeRepos> fetchElectrodiogrammeRepo(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(electrocardiogrammeReposService.fetchElectrocardiogrammeRepos(jockeyId));
    }

    @GetMapping("/historique/{dossierId}")
    public ResponseEntity<ElectrocardiogrammeRepos> fetchElectrodiogrammeRepoByDossierId(@PathVariable int dossierId) throws Exception {
        return ResponseEntity.ok(electrocardiogrammeReposService.fetchElectrocardiogrammeReposByDossierId(dossierId));
    }

    @PutMapping
    public ResponseEntity<Void> updateElectrodiogrammeRepo(@PathVariable int jockeyId, @RequestBody ElectrocardiogrammeRepos electrocardiogrammeRepos) throws Exception {
        electrocardiogrammeReposService.updateElectrocardiogrammeRepos(jockeyId, electrocardiogrammeRepos);
        return ResponseEntity.ok().build();
    }
}
