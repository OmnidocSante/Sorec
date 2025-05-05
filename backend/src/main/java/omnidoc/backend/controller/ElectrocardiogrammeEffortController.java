package omnidoc.backend.controller;


import omnidoc.backend.entity.examens.electrocardiogrammes.ElectrocardiogrammeEffort;
import omnidoc.backend.entity.examens.electrocardiogrammes.ElectrocardiogrammeRepos;
import omnidoc.backend.service.ElectrocardiogrammeEffortService;
import omnidoc.backend.service.ElectrocardiogrammeReposService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/electrocardiogramme-effort")
public class ElectrocardiogrammeEffortController {

    private final ElectrocardiogrammeEffortService electrocardiogrammeEffortService;

    public ElectrocardiogrammeEffortController(ElectrocardiogrammeEffortService electrocardiogrammeEffortService) {
        this.electrocardiogrammeEffortService = electrocardiogrammeEffortService;
    }

    @GetMapping
    public ResponseEntity<ElectrocardiogrammeEffort> fetchElectrocardiogrammeEffort(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(electrocardiogrammeEffortService.fetchElectrocardiogrammeEffort(jockeyId));
    }

    @PostMapping
    public ResponseEntity<Void> updateElectrocardiogrammeEffort(@PathVariable int jockeyId, @RequestBody ElectrocardiogrammeEffort electrocardiogrammeEffort) throws Exception {
        electrocardiogrammeEffortService.updateElectrocardiogrammeEffort(jockeyId, electrocardiogrammeEffort);
        return ResponseEntity.ok().build();
    }
}