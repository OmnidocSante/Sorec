package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenAuditif;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenAuditifRepo;
import omnidoc.backend.util.Util;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ExamenAuditifService {

    private static final String HIDDEN_MARKER = "HIDDEN";

    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ExamenAuditifRepo examenAuditifRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    public ExamenAuditifService(DossierMedicaleRepo dossierMedicaleRepo, ExamenAuditifRepo examenAuditifRepo, FieldVisibilityService fieldVisibilityService, AccessService accessService) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.examenAuditifRepo = examenAuditifRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }

    public ExamenAuditif fetchExamenAuditif(int jockeyId) throws Exception {
        accessService.verifyAccess(jockeyId);

        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId)
                .orElseThrow(() -> new ApiException("not found"));

        return getExamenAuditif(dossierMedicale);
    }

    public ExamenAuditif fetchExamenAuditifByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .findById(dossierId)
                .orElseThrow(() -> new ApiException("not found"));

        return getExamenAuditif(dossierMedicale);
    }

    private ExamenAuditif getExamenAuditif(DossierMedicale dossierMedicale) throws Exception {
        ExamenAuditif examenAuditif = dossierMedicale.getExamenAuditif();
        examenAuditif.setDossierMedicale(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("examen_auditif");

        examenAuditif.setAcuiteAuditiveADistanceOg(
                hiddenFields.contains("acuite_auditive_a_distance_og") ? HIDDEN_MARKER :
                        Util.decryptIfNotNull(examenAuditif.getAcuiteAuditiveADistanceOg())
        );

        examenAuditif.setAcuiteAuditiveADistanceOd(
                hiddenFields.contains("acuite_auditive_a_distance_od") ? HIDDEN_MARKER :
                        Util.decryptIfNotNull(examenAuditif.getAcuiteAuditiveADistanceOd())
        );

        examenAuditif.setConduitAuditifEtMembranesTympaniqueNormales(
                hiddenFields.contains("conduit_auditif_et_membranes_tympanique_normales") ? HIDDEN_MARKER :
                        Util.decryptIfNotNull(examenAuditif.getConduitAuditifEtMembranesTympaniqueNormales())
        );

        return examenAuditif;
    }

    public void updateExamenAuditif(int jockeyId, ExamenAuditif examenAuditif) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo
                .getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId)
                .orElseThrow(() -> new ApiException("not found"));

        examenAuditif.setDossierMedicale(dossierMedicale);

        examenAuditif.setAcuiteAuditiveADistanceOg(Util.encryptIfNotNull(examenAuditif.getAcuiteAuditiveADistanceOg()));
        examenAuditif.setAcuiteAuditiveADistanceOd(Util.encryptIfNotNull(examenAuditif.getAcuiteAuditiveADistanceOd()));
        examenAuditif.setConduitAuditifEtMembranesTympaniqueNormales(Util.encryptIfNotNull(examenAuditif.getConduitAuditifEtMembranesTympaniqueNormales()));

        examenAuditifRepo.save(examenAuditif);
    }
}
