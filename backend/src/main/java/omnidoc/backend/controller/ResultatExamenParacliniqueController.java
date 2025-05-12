package omnidoc.backend.controller;

import omnidoc.backend.entity.resultat.ResultatExamenParaclinique;
import omnidoc.backend.service.ResultatExamenParacliniqueService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@PreAuthorize("hasAuthority('MEDECIN')")
@RestController
@RequestMapping("/api/jockey/{jockeyId}/resultat-examen-paraclinique")
public class ResultatExamenParacliniqueController {
    private final ResultatExamenParacliniqueService resultatExamenParacliniqueService;

    public ResultatExamenParacliniqueController(ResultatExamenParacliniqueService resultatExamenParacliniqueService) {
        this.resultatExamenParacliniqueService = resultatExamenParacliniqueService;
    }

    @GetMapping
    public ResponseEntity<ResultatExamenParaclinique> fetchResultatExamenParaclinique(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(resultatExamenParacliniqueService.fetchResultatExamenParaclinique(jockeyId));
    }

    @GetMapping("/historique/{dossierId}")
    public ResponseEntity<ResultatExamenParaclinique> fetchResultatExamenParacliniqueByDossierId(@PathVariable int dossierId) throws Exception {
        return ResponseEntity.ok(resultatExamenParacliniqueService.fetchResultatExamenParacliniqueByDossierId(dossierId));
    }

    @PutMapping
    public ResponseEntity<Void> updateResultatExamenParaclinique(@PathVariable int jockeyId, @RequestBody ResultatExamenParaclinique resultatExamenParaclinique) throws Exception {
        resultatExamenParacliniqueService.updateExamenGenitoUrinaire(jockeyId, resultatExamenParaclinique);
        return ResponseEntity.ok().build();
    }
}
