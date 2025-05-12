package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenNeurologique;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenNeurologiqueRepo;
import org.springframework.stereotype.Service;

import java.util.Set;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenNeurologiqueService {

    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ExamenNeurologiqueRepo examenNeurologiqueRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    public ExamenNeurologiqueService(DossierMedicaleRepo dossierMedicaleRepo, ExamenNeurologiqueRepo examenNeurologiqueRepo, FieldVisibilityService fieldVisibilityService, AccessService accessService) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.examenNeurologiqueRepo = examenNeurologiqueRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }

    public ExamenNeurologique fetchExamenPleuroPulmonique(int jockeyId) throws Exception {
        accessService.verifyAccess(jockeyId);

        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        return getExamenNeurologique(dossierMedicale);
    }
    public ExamenNeurologique fetchExamenPleuroPulmoniqueByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.findById(dossierId).orElseThrow(() -> new ApiException("not found"));
        return getExamenNeurologique(dossierMedicale);
    }

    private ExamenNeurologique getExamenNeurologique(DossierMedicale dossierMedicale) throws Exception {
        ExamenNeurologique examenNeurologique = dossierMedicale.getExamenNeurologique();
        examenNeurologique.setDossierMedicale(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("examen_neurologique");

        if (!hiddenFields.contains("reflexe_pupillaire"))
            examenNeurologique.setReflexePupillaire(decryptIfNotNull(examenNeurologique.getReflexePupillaire()));
        else
            examenNeurologique.setReflexePupillaire("HIDDEN");

        if (!hiddenFields.contains("reflexes_ostéo_tendineux"))
            examenNeurologique.setReflexesOstéoTendineux(decryptIfNotNull(examenNeurologique.getReflexesOstéoTendineux()));
        else
            examenNeurologique.setReflexesOstéoTendineux("HIDDEN");

        if (!hiddenFields.contains("coordination"))
            examenNeurologique.setCoordination(decryptIfNotNull(examenNeurologique.getCoordination()));
        else
            examenNeurologique.setCoordination("HIDDEN");

        if (!hiddenFields.contains("equilibre"))
            examenNeurologique.setEquilibre(decryptIfNotNull(examenNeurologique.getEquilibre()));
        else
            examenNeurologique.setEquilibre("HIDDEN");

        if (!hiddenFields.contains("sensibilite"))
            examenNeurologique.setSensibilite(decryptIfNotNull(examenNeurologique.getSensibilite()));
        else
            examenNeurologique.setSensibilite("HIDDEN");

        if (!hiddenFields.contains("motricite"))
            examenNeurologique.setMotricite(decryptIfNotNull(examenNeurologique.getMotricite()));
        else
            examenNeurologique.setMotricite("HIDDEN");

        if (!hiddenFields.contains("tonicite"))
            examenNeurologique.setTonicite(decryptIfNotNull(examenNeurologique.getTonicite()));
        else
            examenNeurologique.setTonicite("HIDDEN");

        if (!hiddenFields.contains("autres"))
            examenNeurologique.setAutres(decryptIfNotNull(examenNeurologique.getAutres()));
        else
            examenNeurologique.setAutres("HIDDEN");

        return examenNeurologique;
    }



    public void updateExamenNeurologique(int jockeyId, ExamenNeurologique examenNeurologique) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        examenNeurologique.setDossierMedicale(dossierMedicale);
        examenNeurologique.setReflexePupillaire(encryptIfNotNull(examenNeurologique.getReflexePupillaire()));
        examenNeurologique.setReflexesOstéoTendineux(encryptIfNotNull(examenNeurologique.getReflexesOstéoTendineux()));
        examenNeurologique.setCoordination(encryptIfNotNull(examenNeurologique.getCoordination()));
        examenNeurologique.setEquilibre(encryptIfNotNull(examenNeurologique.getEquilibre()));
        examenNeurologique.setSensibilite(encryptIfNotNull(examenNeurologique.getSensibilite()));
        examenNeurologique.setMotricite(encryptIfNotNull(examenNeurologique.getMotricite()));
        examenNeurologique.setTonicite(encryptIfNotNull(examenNeurologique.getTonicite()));
        examenNeurologique.setAutres(encryptIfNotNull(examenNeurologique.getAutres()));
        examenNeurologiqueRepo.save(examenNeurologique);
    }
}
