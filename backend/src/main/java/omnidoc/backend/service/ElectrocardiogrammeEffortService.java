package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.electrocardiogrammes.ElectrocardiogrammeEffort;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ElectrocardiogrammeEffortRepo;
import org.springframework.stereotype.Service;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ElectrocardiogrammeEffortService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ElectrocardiogrammeEffortRepo electrocardiogrammeEffortRepo;

    public ElectrocardiogrammeEffortService(DossierMedicaleRepo dossierMedicaleRepo, ElectrocardiogrammeEffortRepo electrocardiogrammeEffortRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.electrocardiogrammeEffortRepo = electrocardiogrammeEffortRepo;
    }

    public ElectrocardiogrammeEffort fetchElectrocardiogrammeEffort(int jockeyId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        ElectrocardiogrammeEffort electrocardiogrammeEffort = dossierMedicale.getElectrocardiogrammeEffort();
        electrocardiogrammeEffort.setDossierMedicale(dossierMedicale);
        electrocardiogrammeEffort.setFrequenceCardiaque(decryptIfNotNull(electrocardiogrammeEffort.getFrequenceCardiaque()));
        electrocardiogrammeEffort.setRythme(decryptIfNotNull(electrocardiogrammeEffort.getRythme()));
        electrocardiogrammeEffort.setConduction(decryptIfNotNull(electrocardiogrammeEffort.getConduction()));
        electrocardiogrammeEffort.setAxeQRS(decryptIfNotNull(electrocardiogrammeEffort.getAxeQRS()));
        electrocardiogrammeEffort.setRepolarisation(decryptIfNotNull(electrocardiogrammeEffort.getRepolarisation()));

        return electrocardiogrammeEffort;
    }

    public void updateElectrocardiogrammeEffort(int jockeyId, ElectrocardiogrammeEffort electrocardiogrammeEffort) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        electrocardiogrammeEffort.setDossierMedicale(dossierMedicale);
        electrocardiogrammeEffort.setFrequenceCardiaque(encryptIfNotNull(electrocardiogrammeEffort.getFrequenceCardiaque()));
        electrocardiogrammeEffort.setRythme(encryptIfNotNull(electrocardiogrammeEffort.getRythme()));
        electrocardiogrammeEffort.setConduction(encryptIfNotNull(electrocardiogrammeEffort.getConduction()));
        electrocardiogrammeEffort.setAxeQRS(encryptIfNotNull(electrocardiogrammeEffort.getAxeQRS()));
        electrocardiogrammeEffort.setRepolarisation(encryptIfNotNull(electrocardiogrammeEffort.getRepolarisation()));
        electrocardiogrammeEffortRepo.save(electrocardiogrammeEffort);
    }
}
