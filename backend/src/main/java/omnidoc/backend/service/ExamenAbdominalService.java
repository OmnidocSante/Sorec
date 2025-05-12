package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenAbdominal;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenAbdominalRepo;
import org.springframework.stereotype.Service;

import java.util.Set;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenAbdominalService {

    private static final String HIDDEN_MARKER = "HIDDEN";

    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ExamenAbdominalRepo examenAbdominalRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    public ExamenAbdominalService(DossierMedicaleRepo dossierMedicaleRepo, ExamenAbdominalRepo examenAbdominalRepo, FieldVisibilityService fieldVisibilityService, AccessService accessService) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.examenAbdominalRepo = examenAbdominalRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }

    public ExamenAbdominal fetchExamenAbdominal(int jockeyId) throws Exception {
        accessService.verifyAccess(jockeyId);

        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId)
                .orElseThrow(() -> new ApiException("not found"));

        return getExamenAbdominalWithVisibility(dossierMedicale);
    }

    public ExamenAbdominal fetchExamenAbdominalByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .findById(dossierId)
                .orElseThrow(() -> new ApiException("not found"));

        return getExamenAbdominalWithVisibility(dossierMedicale);
    }

    private ExamenAbdominal getExamenAbdominalWithVisibility(DossierMedicale dossierMedicale) throws Exception {
        ExamenAbdominal examen = getExamenAbdominal(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("examen_abdominal");

        examen.setFoie(hiddenFields.contains("foie") ? HIDDEN_MARKER : decryptIfNotNull(examen.getFoie()));
        examen.setRate(hiddenFields.contains("rate") ? HIDDEN_MARKER : decryptIfNotNull(examen.getRate()));
        examen.setOropharynx(hiddenFields.contains("oropharynx") ? HIDDEN_MARKER : decryptIfNotNull(examen.getOropharynx()));
        examen.setAutres(hiddenFields.contains("autres") ? HIDDEN_MARKER : decryptIfNotNull(examen.getAutres()));

        return examen;
    }

    private ExamenAbdominal getExamenAbdominal(DossierMedicale dossierMedicale) {
        ExamenAbdominal examenAbdominal = dossierMedicale.getExamenAbdominal();
        examenAbdominal.setDossierMedicale(dossierMedicale);
        return examenAbdominal;
    }

    public void updateExamenAbdominal(int jockeyId, ExamenAbdominal examenAbdominal) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId)
                .orElseThrow(() -> new ApiException("not found"));

        examenAbdominal.setDossierMedicale(dossierMedicale);

        examenAbdominal.setFoie(encryptIfNotNull(examenAbdominal.getFoie()));
        examenAbdominal.setRate(encryptIfNotNull(examenAbdominal.getRate()));
        examenAbdominal.setOropharynx(encryptIfNotNull(examenAbdominal.getOropharynx()));
        examenAbdominal.setAutres(encryptIfNotNull(examenAbdominal.getAutres()));

        examenAbdominalRepo.save(examenAbdominal);
    }
}
