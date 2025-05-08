package omnidoc.backend.controller;

import omnidoc.backend.entity.enums.Status;
import omnidoc.backend.service.HistoriqueStatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/historique/status")
public class HistoriqueStatusController {
    private final HistoriqueStatusService historiqueStatusService;

    public HistoriqueStatusController(HistoriqueStatusService historiqueStatusService) {
        this.historiqueStatusService = historiqueStatusService;
    }

    @PostMapping
    public ResponseEntity<Void> addStatus(@PathVariable int jockeyId, @RequestHeader("Authorization") String jwt, @RequestBody HashMap<String, Status> statusHashMap) throws Exception {

        Status status = statusHashMap.get("status");
        System.out.println(status);
        historiqueStatusService.addStatus(status, jockeyId, jwt);
        return ResponseEntity.ok().build();
    }


    @GetMapping
    public ResponseEntity<List<HistoriqueStatusService.HistoriqueStatusRecord>> getHistorique(@PathVariable int jockeyId) {
        return ResponseEntity.ok(historiqueStatusService.getStatus(jockeyId));
    }


}
