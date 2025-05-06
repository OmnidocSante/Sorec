package omnidoc.backend.controller;

import omnidoc.backend.DTOS.AntecedentPersonnelDTO;
import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.entity.enums.SystemeMedical;
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


    @PutMapping
    public ResponseEntity<Void> ChangeAntecedantsByPatientId(@PathVariable int jockeyId, @RequestBody List<AntecedentPersonnel> antecedentPersonnels) throws Exception {
        antecedantPersonnelService.changeAntecedantPersonnelByPatientId(antecedentPersonnels);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/appareil-cardiovasculaire")
    public ResponseEntity<List<AntecedentPersonnelDTO>> getAppareilCardioVasculaire(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(antecedantPersonnelService.getAntecedentBysysteme(jockeyId, SystemeMedical.APPAREIL_CARDIO_VASCULAIRE));
    }

    @GetMapping("/appareil-respiratoire")
    public ResponseEntity<List<AntecedentPersonnelDTO>> getAppareilRespiratoire(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(antecedantPersonnelService.getAntecedentBysysteme(jockeyId, SystemeMedical.APPAREIL_RESPIRATOIRE));
    }

    @GetMapping("/systeme-nerveux")
    public ResponseEntity<List<AntecedentPersonnelDTO>> getSystemeNerveux(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(antecedantPersonnelService.getAntecedentBysysteme(jockeyId, SystemeMedical.SYSTEME_NERVEUX));
    }

    @GetMapping("/orl")
    public ResponseEntity<List<AntecedentPersonnelDTO>> getOrl(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(antecedantPersonnelService.getAntecedentBysysteme(jockeyId, SystemeMedical.ORL));
    }

    @GetMapping("/allergies")
    public ResponseEntity<List<AntecedentPersonnelDTO>> getAllergies(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(antecedantPersonnelService.getAntecedentBysysteme(jockeyId, SystemeMedical.ALLERGIES));
    }

    @GetMapping("/traumatologie")
    public ResponseEntity<List<AntecedentPersonnelDTO>> getTraumatologie(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(antecedantPersonnelService.getAntecedentBysysteme(jockeyId, SystemeMedical.TRAUMATOLOGIE));
    }

    @GetMapping("/appareil-digestif")
    public ResponseEntity<List<AntecedentPersonnelDTO>> getAppareilDigestif(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(antecedantPersonnelService.getAntecedentBysysteme(jockeyId, SystemeMedical.APPAREIL_DIGESTIF));
    }

    @GetMapping("/endocrinologie")
    public ResponseEntity<List<AntecedentPersonnelDTO>> getEndocrinologie(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(antecedantPersonnelService.getAntecedentBysysteme(jockeyId, SystemeMedical.ENDOCRINOLOGIE));
    }

    @GetMapping("/autres")
    public ResponseEntity<List<AntecedentPersonnelDTO>> getAutres(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(antecedantPersonnelService.getAntecedentBysysteme(jockeyId, SystemeMedical.AUTRES));
    }


}
