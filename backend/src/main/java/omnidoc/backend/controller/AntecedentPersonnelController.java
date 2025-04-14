package omnidoc.backend.controller;

import omnidoc.backend.entity.dossier.AntecedentPersonnel;
import omnidoc.backend.service.AntecedantPersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dossier/{dossierId}/antecedentPersonnel")
public class AntecedentPersonnelController {
    @Autowired
    private AntecedantPersonnelService antecedantPersonnelService;

    @PostMapping
    public void saveAntecedentPersonnel(@RequestBody AntecedentPersonnel antecedentPersonnel, @PathVariable int dossierId) throws Exception {
        antecedantPersonnelService.saveAntecedantPersonnel(antecedentPersonnel, dossierId);
    }

    @GetMapping
    public ResponseEntity<AntecedentPersonnel> getAntecedentPersonnel(@PathVariable int dossierId) throws Exception {
        return new ResponseEntity<>(antecedantPersonnelService.getAntecedantPersonnel(dossierId), HttpStatus.OK);
    }
}
