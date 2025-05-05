package omnidoc.backend.controller;


import omnidoc.backend.service.DossierMedicaleService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/jockey/{jockeyId}")
public class DossierMedicaleController {
    @Autowired
    private DossierMedicaleService dossierMedicaleService;

}
