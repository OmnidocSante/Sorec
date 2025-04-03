package omnidoc.backend.controller;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.request.DossierRequest;
import omnidoc.backend.service.DossierMedicaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/dossiers")
public class DossierController {
    @Autowired
    public DossierMedicaleService dossierMedicaleService;

    @PostMapping
    public ResponseEntity<Void> createFolder(@RequestBody DossierRequest dossierRequest) {
        dossierMedicaleService.createDossier(dossierRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> modifyFolder(@RequestBody DossierRequest dossierRequest){
        dossierMedicaleService.modifyDossier(dossierRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();


    }



}
