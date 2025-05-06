package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.electrocardiogrammes.ElectrocardiogrammeRepos;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ElectrocardiogrammeReposRepo;
import org.springframework.stereotype.Service;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ElectrocardiogrammeReposService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ElectrocardiogrammeReposRepo electrocardiogrammeReposRepo;

    public ElectrocardiogrammeReposService(DossierMedicaleRepo dossierMedicaleRepo, ElectrocardiogrammeReposRepo electrocardiogrammeReposRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.electrocardiogrammeReposRepo = electrocardiogrammeReposRepo;
    }

    public ElectrocardiogrammeRepos fetchElectrocardiogrammeRepos(int jockeyId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        ElectrocardiogrammeRepos electrocardiogrammeRepos = dossierMedicale.getElectrocardiogrammeRepos();
        electrocardiogrammeRepos.setDossierMedicale(dossierMedicale);
        electrocardiogrammeRepos.setFrequenceCardiaque(decryptIfNotNull(electrocardiogrammeRepos.getFrequenceCardiaque()));
        electrocardiogrammeRepos.setRythme(decryptIfNotNull(electrocardiogrammeRepos.getRythme()));
        electrocardiogrammeRepos.setConduction(decryptIfNotNull(electrocardiogrammeRepos.getConduction()));
        electrocardiogrammeRepos.setAxeQRS(decryptIfNotNull(electrocardiogrammeRepos.getAxeQRS()));
        electrocardiogrammeRepos.setRepolarisation(decryptIfNotNull(electrocardiogrammeRepos.getRepolarisation()));

        return electrocardiogrammeRepos;
    }

    public void updateElectrocardiogrammeRepos(int jockeyId, ElectrocardiogrammeRepos electrocardiogrammeRepos) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        electrocardiogrammeRepos.setDossierMedicale(dossierMedicale);
        electrocardiogrammeRepos.setFrequenceCardiaque(encryptIfNotNull(electrocardiogrammeRepos.getFrequenceCardiaque()));
        electrocardiogrammeRepos.setRythme(encryptIfNotNull(electrocardiogrammeRepos.getRythme()));
        electrocardiogrammeRepos.setConduction(encryptIfNotNull(electrocardiogrammeRepos.getConduction()));
        electrocardiogrammeRepos.setAxeQRS(encryptIfNotNull(electrocardiogrammeRepos.getAxeQRS()));
        electrocardiogrammeRepos.setRepolarisation(encryptIfNotNull(electrocardiogrammeRepos.getRepolarisation()));
        electrocardiogrammeReposRepo.save(electrocardiogrammeRepos);
    }
}
