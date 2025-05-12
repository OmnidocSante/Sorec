package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.electrocardiogrammes.ElectrocardiogrammeRepos;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ElectrocardiogrammeReposRepo;
import org.springframework.stereotype.Service;

import java.util.Set;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ElectrocardiogrammeReposService {
    private static final String HIDDEN_MARKER = "HIDDEN";

    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ElectrocardiogrammeReposRepo electrocardiogrammeReposRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    public ElectrocardiogrammeReposService(
            DossierMedicaleRepo dossierMedicaleRepo,
            ElectrocardiogrammeReposRepo electrocardiogrammeReposRepo,
            FieldVisibilityService fieldVisibilityService,
            AccessService accessService
    ) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.electrocardiogrammeReposRepo = electrocardiogrammeReposRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }

    public ElectrocardiogrammeRepos fetchElectrocardiogrammeRepos(int jockeyId) throws Exception {
        accessService.verifyAccess(jockeyId);

        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId)
                .orElseThrow(() -> new ApiException("not found"));

        return getElectrocardiogrammeRepos(dossierMedicale);
    }

    public ElectrocardiogrammeRepos fetchElectrocardiogrammeReposByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .findById(dossierId)
                .orElseThrow(() -> new ApiException("not found"));

        return getElectrocardiogrammeRepos(dossierMedicale);
    }

    private ElectrocardiogrammeRepos getElectrocardiogrammeRepos(DossierMedicale dossierMedicale) throws Exception {
        ElectrocardiogrammeRepos electrocardiogrammeRepos = dossierMedicale.getElectrocardiogrammeRepos();
        electrocardiogrammeRepos.setDossierMedicale(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("electrocardiogramme_repos");

        electrocardiogrammeRepos.setFrequenceCardiaque(
                hiddenFields.contains("frequence-cardiaque") ? HIDDEN_MARKER : decryptIfNotNull(electrocardiogrammeRepos.getFrequenceCardiaque())
        );
        electrocardiogrammeRepos.setRythme(
                hiddenFields.contains("rythme") ? HIDDEN_MARKER : decryptIfNotNull(electrocardiogrammeRepos.getRythme())
        );
        electrocardiogrammeRepos.setConduction(
                hiddenFields.contains("conduction") ? HIDDEN_MARKER : decryptIfNotNull(electrocardiogrammeRepos.getConduction())
        );
        electrocardiogrammeRepos.setAxeQRS(
                hiddenFields.contains("axe_qrs") ? HIDDEN_MARKER : decryptIfNotNull(electrocardiogrammeRepos.getAxeQRS())
        );
        electrocardiogrammeRepos.setRepolarisation(
                hiddenFields.contains("repolarisation") ? HIDDEN_MARKER : decryptIfNotNull(electrocardiogrammeRepos.getRepolarisation())
        );

        return electrocardiogrammeRepos;
    }

    public void updateElectrocardiogrammeRepos(int jockeyId, ElectrocardiogrammeRepos electrocardiogrammeRepos) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId)
                .orElseThrow(() -> new ApiException("not found"));

        electrocardiogrammeRepos.setDossierMedicale(dossierMedicale);

        electrocardiogrammeRepos.setFrequenceCardiaque(encryptIfNotNull(electrocardiogrammeRepos.getFrequenceCardiaque()));
        electrocardiogrammeRepos.setRythme(encryptIfNotNull(electrocardiogrammeRepos.getRythme()));
        electrocardiogrammeRepos.setConduction(encryptIfNotNull(electrocardiogrammeRepos.getConduction()));
        electrocardiogrammeRepos.setAxeQRS(encryptIfNotNull(electrocardiogrammeRepos.getAxeQRS()));
        electrocardiogrammeRepos.setRepolarisation(encryptIfNotNull(electrocardiogrammeRepos.getRepolarisation()));

        electrocardiogrammeReposRepo.save(electrocardiogrammeRepos);
    }
}
