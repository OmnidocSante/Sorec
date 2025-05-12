package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenOphtalmogique;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenOphtalmogiqueRepo;
import org.springframework.stereotype.Service;

import java.util.Set;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenOphtalmogiqueService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ExamenOphtalmogiqueRepo examenOphtalmogiqueRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    public ExamenOphtalmogiqueService(DossierMedicaleRepo dossierMedicaleRepo, ExamenOphtalmogiqueRepo examenOphtalmogiqueRepo, FieldVisibilityService fieldVisibilityService, AccessService accessService) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.examenOphtalmogiqueRepo = examenOphtalmogiqueRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }

    public ExamenOphtalmogique fetchExamenOphtalmogique(int jockeyId) throws Exception {
        accessService.verifyAccess(jockeyId);

        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        return getExamenOphtalmogique(dossierMedicale);

    }

    public ExamenOphtalmogique fetchExamenOphtalmogiqueByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.findById(dossierId).orElseThrow(() -> new ApiException("not found"));
        return getExamenOphtalmogique(dossierMedicale);

    }

    private ExamenOphtalmogique getExamenOphtalmogique(DossierMedicale dossierMedicale) throws Exception {
        ExamenOphtalmogique examenOphtalmogique = dossierMedicale.getExamenOphtalmogique();
        examenOphtalmogique.setDossierMedicale(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("examen_ophtalmogique");

        if (!hiddenFields.contains("og_corrige"))
            examenOphtalmogique.setOgCorrige(decryptIfNotNull(examenOphtalmogique.getOgCorrige()));
        else
            examenOphtalmogique.setOgCorrige("HIDDEN");

        if (!hiddenFields.contains("og_non_corrige"))
            examenOphtalmogique.setOgNonCorrige(decryptIfNotNull(examenOphtalmogique.getOgNonCorrige()));
        else
            examenOphtalmogique.setOgNonCorrige("HIDDEN");

        if (!hiddenFields.contains("od_non_corrige"))
            examenOphtalmogique.setOdNonCorrige(decryptIfNotNull(examenOphtalmogique.getOdNonCorrige()));
        else
            examenOphtalmogique.setOdNonCorrige("HIDDEN");

        if (!hiddenFields.contains("od_corrige"))
            examenOphtalmogique.setOdCorrige(decryptIfNotNull(examenOphtalmogique.getOdCorrige()));
        else
            examenOphtalmogique.setOdCorrige("HIDDEN");

        if (!hiddenFields.contains("paupieres_et_cornees_normale"))
            examenOphtalmogique.setPaupieresEtCorneesNormale(decryptIfNotNull(examenOphtalmogique.getPaupieresEtCorneesNormale()));
        else
            examenOphtalmogique.setPaupieresEtCorneesNormale("HIDDEN");

        return examenOphtalmogique;
    }


    public void updateExamenOphtalmogique(int jockeyId, ExamenOphtalmogique examenOphtalmogique) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        examenOphtalmogique.setDossierMedicale(dossierMedicale);
        examenOphtalmogique.setOgCorrige(encryptIfNotNull(examenOphtalmogique.getOgCorrige()));
        examenOphtalmogique.setOgNonCorrige(encryptIfNotNull(examenOphtalmogique.getOgNonCorrige()));
        examenOphtalmogique.setOdNonCorrige(encryptIfNotNull(examenOphtalmogique.getOdNonCorrige()));
        examenOphtalmogique.setOdCorrige(encryptIfNotNull(examenOphtalmogique.getOdCorrige()));
        examenOphtalmogique.setPaupieresEtCorneesNormale(encryptIfNotNull(examenOphtalmogique.getPaupieresEtCorneesNormale()));
        examenOphtalmogiqueRepo.save(examenOphtalmogique);
    }
}
