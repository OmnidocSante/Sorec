package omnidoc.backend.controller;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.service.HistoriqueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/historique")
public class HistoriqueController {
    private final HistoriqueService historiqueService;

    public HistoriqueController(HistoriqueService historiqueService) {
        this.historiqueService = historiqueService;
    }

    @GetMapping
    public ResponseEntity<List<DossierMedicale>> getDossiersMedicales(@PathVariable int jockeyId){
        return ResponseEntity.ok(historiqueService.fetchHistorique(jockeyId));
    }
}
