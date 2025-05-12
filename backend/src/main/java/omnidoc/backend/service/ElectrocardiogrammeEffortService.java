package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.electrocardiogrammes.ElectrocardiogrammeEffort;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ElectrocardiogrammeEffortRepo;
import org.springframework.stereotype.Service;

import java.util.Set;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ElectrocardiogrammeEffortService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ElectrocardiogrammeEffortRepo electrocardiogrammeEffortRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    private static final String HIDDEN_MARKER = "HIDDEN";

    public ElectrocardiogrammeEffortService(
            DossierMedicaleRepo dossierMedicaleRepo,
            ElectrocardiogrammeEffortRepo electrocardiogrammeEffortRepo,
            FieldVisibilityService fieldVisibilityService,
            AccessService accessService
    ) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.electrocardiogrammeEffortRepo = electrocardiogrammeEffortRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }

    public ElectrocardiogrammeEffort fetchElectrocardiogrammeEffort(int jockeyId) throws Exception {
        accessService.verifyAccess(jockeyId);

        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId)
                .orElseThrow(() -> new ApiException("not found"));

        return getElectrocardiogrammeEffort(dossierMedicale);
    }

    public ElectrocardiogrammeEffort fetchElectrocardiogrammeEffortByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .findById(dossierId)
                .orElseThrow(() -> new ApiException("not found"));

        return getElectrocardiogrammeEffort(dossierMedicale);
    }

    private ElectrocardiogrammeEffort getElectrocardiogrammeEffort(DossierMedicale dossierMedicale) throws Exception {
        ElectrocardiogrammeEffort e = dossierMedicale.getElectrocardiogrammeEffort();
        e.setDossierMedicale(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("electrocardiogramme_effort");

        e.setFrequenceCardiaque(hiddenFields.contains("frequence-cardiaque") ? HIDDEN_MARKER : decryptIfNotNull(e.getFrequenceCardiaque()));
        e.setRythme(hiddenFields.contains("rythme") ? HIDDEN_MARKER : decryptIfNotNull(e.getRythme()));
        e.setConduction(hiddenFields.contains("conduction") ? HIDDEN_MARKER : decryptIfNotNull(e.getConduction()));
        e.setAxeQRS(hiddenFields.contains("axe_qrs") ? HIDDEN_MARKER : decryptIfNotNull(e.getAxeQRS()));
        e.setRepolarisation(hiddenFields.contains("repolarisation") ? HIDDEN_MARKER : decryptIfNotNull(e.getRepolarisation()));

        return e;
    }

    public void updateElectrocardiogrammeEffort(int jockeyId, ElectrocardiogrammeEffort e) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId)
                .orElseThrow(() -> new ApiException("not found"));

        e.setDossierMedicale(dossierMedicale);
        e.setFrequenceCardiaque(encryptIfNotNull(e.getFrequenceCardiaque()));
        e.setRythme(encryptIfNotNull(e.getRythme()));
        e.setConduction(encryptIfNotNull(e.getConduction()));
        e.setAxeQRS(encryptIfNotNull(e.getAxeQRS()));
        e.setRepolarisation(encryptIfNotNull(e.getRepolarisation()));

        electrocardiogrammeEffortRepo.save(e);
    }
}
