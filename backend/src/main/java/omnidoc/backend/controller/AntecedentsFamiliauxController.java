package omnidoc.backend.controller;

import omnidoc.backend.entity.antecedents_familiaux.AntecedentFamiliaux;
import omnidoc.backend.service.AntecedentFamiliauxService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/antecedent-familiaux")
public class AntecedentsFamiliauxController {

    private final AntecedentFamiliauxService antecedentFamiliauxService;

    public AntecedentsFamiliauxController( AntecedentFamiliauxService antecedentFamiliauxService) {
        this.antecedentFamiliauxService = antecedentFamiliauxService;
    }

    @GetMapping
    public ResponseEntity<AntecedentFamiliaux> fetchAntcedentFamiliaux(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(antecedentFamiliauxService.fetchAntecedentFamiliaux(jockeyId));
    }
    @GetMapping("/historique/{dossierId}")
    public ResponseEntity<AntecedentFamiliaux> fetchAntcedentFamiliauxByDossierId(@PathVariable int dossierId) throws Exception {
        return ResponseEntity.ok(antecedentFamiliauxService.fetchAntecedentFamiliauxByDossierId(dossierId));
    }

    @PutMapping
    public ResponseEntity<Void> updateConclusion(@PathVariable int jockeyId, @RequestBody AntecedentFamiliaux antecedentFamiliaux) throws Exception {
        antecedentFamiliauxService.updateAntecedentFamiliaux(jockeyId, antecedentFamiliaux);
        return ResponseEntity.ok().build();
    }
}
