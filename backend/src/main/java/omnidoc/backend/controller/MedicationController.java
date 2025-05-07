package omnidoc.backend.controller;

import omnidoc.backend.entity.dossier.Medication;
import omnidoc.backend.service.MedicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jockey/{jockeyId}/medication")
public class MedicationController {
    private final MedicationService medicationService;

    public MedicationController(MedicationService medicationService) {
        this.medicationService = medicationService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('MEDECIN')")
    public List<Medication> fetchMedicationByPatientId(@PathVariable int jockeyId) throws Exception {
        return medicationService.fetchMedicationByPatientId(jockeyId);
    }

    @GetMapping("/historique/{dossierId}")
    @PreAuthorize("hasAuthority('MEDECIN')")
    public List<Medication> fetchMedicationByDossierId(@PathVariable int dossierId) throws Exception {
        return medicationService.fetchMedicationByDossierId(dossierId);
    }


    @PostMapping
    @PreAuthorize("hasAuthority('MEDECIN')")
    public ResponseEntity<Void> addMedication(@PathVariable int jockeyId, @RequestBody List<Medication> medications, @RequestHeader("Authorization") String jwt) throws Exception {
        medicationService.addMedication(jockeyId, medications, jwt);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{medicamentId}")
    public ResponseEntity<Void> deleteMedication(@PathVariable int medicamentId) {
        medicationService.deleteMedication(medicamentId);
        return ResponseEntity.ok().build();

    }

}
