package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.resultat.Conclusion;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.ConclusionRepo;
import omnidoc.backend.repository.DossierMedicaleRepo;
import org.springframework.stereotype.Service;

import java.util.Set;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ConclusionService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ConclusionRepo conclusionRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    private static final String HIDDEN_MARKER = "HIDDEN";

    public ConclusionService(DossierMedicaleRepo dossierMedicaleRepo, ConclusionRepo conclusionRepo, FieldVisibilityService fieldVisibilityService, AccessService accessService) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.conclusionRepo = conclusionRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }

    public Conclusion fetchConclusion(int jockeyId) throws Exception {
        accessService.verifyAccess(jockeyId);
        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId)
                .orElseThrow(() -> new ApiException("not found"));
        return getConclusion(dossierMedicale);
    }

    public Conclusion fetchConclusionByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .findById(dossierId)
                .orElseThrow(() -> new ApiException("not found"));
        return getConclusion(dossierMedicale);
    }

    private Conclusion getConclusion(DossierMedicale dossierMedicale) throws Exception {
        Conclusion conclusion = dossierMedicale.getConclusion();
        conclusion.setDossierMedicale(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("conclusion");

        conclusion.setCardioVasculaire(
                hiddenFields.contains("cardio-vasculaire") ? HIDDEN_MARKER : decryptIfNotNull(conclusion.getCardioVasculaire())
        );

        conclusion.setPleuropulmonaire(
                hiddenFields.contains("pleuropulmonaire") ? HIDDEN_MARKER : decryptIfNotNull(conclusion.getPleuropulmonaire())
        );

        conclusion.setOphtalmique(
                hiddenFields.contains("ophtalmique") ? HIDDEN_MARKER : decryptIfNotNull(conclusion.getOphtalmique())
        );

        conclusion.setAuditif(
                hiddenFields.contains("auditif") ? HIDDEN_MARKER : decryptIfNotNull(conclusion.getAuditif())
        );

        conclusion.setNeurologique(
                hiddenFields.contains("neurologique") ? HIDDEN_MARKER : decryptIfNotNull(conclusion.getNeurologique())
        );

        conclusion.setAbdominal(
                hiddenFields.contains("abdominal") ? HIDDEN_MARKER : decryptIfNotNull(conclusion.getAbdominal())
        );

        conclusion.setUrogénital(
                hiddenFields.contains("urogénital") ? HIDDEN_MARKER : decryptIfNotNull(conclusion.getUrogénital())
        );

        conclusion.setParaclinique(
                hiddenFields.contains("paraclinique") ? HIDDEN_MARKER : decryptIfNotNull(conclusion.getParaclinique())
        );

        return conclusion;
    }

    public void updateConclusion(int jockeyId, Conclusion conclusion) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId)
                .orElseThrow(() -> new ApiException("not found"));

        conclusion.setCardioVasculaire(encryptIfNotNull(conclusion.getCardioVasculaire()));
        conclusion.setPleuropulmonaire(encryptIfNotNull(conclusion.getPleuropulmonaire()));
        conclusion.setOphtalmique(encryptIfNotNull(conclusion.getOphtalmique()));
        conclusion.setAuditif(encryptIfNotNull(conclusion.getAuditif()));
        conclusion.setNeurologique(encryptIfNotNull(conclusion.getNeurologique()));
        conclusion.setAbdominal(encryptIfNotNull(conclusion.getAbdominal()));
        conclusion.setUrogénital(encryptIfNotNull(conclusion.getUrogénital()));
        conclusion.setParaclinique(encryptIfNotNull(conclusion.getParaclinique()));

        conclusion.setDossierMedicale(dossierMedicale);
        conclusionRepo.save(conclusion);
    }
}
