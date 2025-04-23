package omnidoc.backend.controller;

import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.service.DossierMedicaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dossier_medicale")
public class DossierMedicaleController {
    @Autowired
    private DossierMedicaleService dossierMedicaleService;

    @GetMapping("/{patientId}")
    public ResponseEntity<List<AntecedentPersonnel>> getAntecedantsByPatientId(@PathVariable int patientId) {
        return ResponseEntity.ok(dossierMedicaleService.getAntecedantPersonnelsByPatientId(patientId));
    }

    @PutMapping("/{patientId}")
    public ResponseEntity<Void> ChangeAntecedantsByPatientId(@PathVariable int patientId, @RequestBody List<AntecedentPersonnel> antecedentPersonnels) {
        dossierMedicaleService.changeAntecedantPersonnelByPatientId(patientId, antecedentPersonnels);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
