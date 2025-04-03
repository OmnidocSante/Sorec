package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.JockeyRepo;
import omnidoc.backend.request.DossierRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DossierMedicaleService {
    @Autowired
    public DossierMedicaleRepo dossierMedicaleRepo;
    @Autowired
    public JockeyRepo jockeyRepo;

    public void createDossier(DossierRequest dossierRequest) {
        Jockey jockey = jockeyRepo.findById(dossierRequest.getJockeyId()).orElseThrow(() -> new ApiException("Jockey not found"));
        DossierMedicale dossierMedicale = new DossierMedicale(jockey, dossierRequest.getBlood());
        dossierMedicaleRepo.save(dossierMedicale);
    }

    public void modifyDossier(DossierRequest dossierRequest) {
        Jockey jockey = jockeyRepo.findById(dossierRequest.getJockeyId()).orElseThrow(() -> new ApiException("Jockey not found"));
        dossierMedicaleRepo.deactivateOldVersions(dossierRequest.getJockeyId());
        DossierMedicale dossierMedicale = new DossierMedicale(jockey, dossierRequest.getChampsModifies(), dossierRequest.getBlood());
        dossierMedicale.setIsCurrent(true);
        dossierMedicaleRepo.save(dossierMedicale);
    }


}
