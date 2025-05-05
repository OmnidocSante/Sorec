package omnidoc.backend.controller;

import omnidoc.backend.DTOS.AntecedentPersonnelDTO;
import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.service.AntecedantPersonnelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/antecedent-personnel")

public class AntecedantPersonnelController {

    private final AntecedantPersonnelService antecedantPersonnelService;

    public AntecedantPersonnelController(AntecedantPersonnelService antecedantPersonnelService) {
        this.antecedantPersonnelService = antecedantPersonnelService;
    }

    @GetMapping
    public ResponseEntity<List<AntecedentPersonnelDTO>> getAntecedantsByPatientId(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(antecedantPersonnelService.getAntecedantPersonnelsByPatientId(jockeyId));
    }

    @PutMapping
    public ResponseEntity<Void> ChangeAntecedantsByPatientId(@PathVariable int jockeyId, @RequestBody List<AntecedentPersonnel> antecedentPersonnels) throws Exception {
        antecedantPersonnelService.changeAntecedantPersonnelByPatientId(antecedentPersonnels);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
