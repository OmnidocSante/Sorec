package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenPleuroPulmonaire;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenPleuroPulmonaireRepo;
import org.springframework.stereotype.Service;

import java.util.Set;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenPleuroPulmonaireService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ExamenPleuroPulmonaireRepo examenPleuroPulmonaireRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    public ExamenPleuroPulmonaireService(DossierMedicaleRepo dossierMedicaleRepo, ExamenPleuroPulmonaireRepo examenPleuroPulmonaireRepo, FieldVisibilityService fieldVisibilityService, AccessService accessService) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.examenPleuroPulmonaireRepo = examenPleuroPulmonaireRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }

    public ExamenPleuroPulmonaire fetchExamenPleuroPulmonique(int jockeyId) throws Exception {
        accessService.verifyAccess(jockeyId);

        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));


        return getExamenPleuroPulmonaire(dossierMedicale);
    }

    public ExamenPleuroPulmonaire fetchExamenPleuroPulmoniqueByDossier(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.findById(dossierId).orElseThrow(() -> new ApiException("not found"));


        return getExamenPleuroPulmonaire(dossierMedicale);
    }

    private ExamenPleuroPulmonaire getExamenPleuroPulmonaire(DossierMedicale dossierMedicale) throws Exception {
        ExamenPleuroPulmonaire examenPleuroPulmonaire = dossierMedicale.getExamenPleuroPulmonaire();
        examenPleuroPulmonaire.setDossierMedicale(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("examen_pleuro_pulmonaire");

        if (!hiddenFields.contains("austucultation"))
            examenPleuroPulmonaire.setAustucultation(decryptIfNotNull(examenPleuroPulmonaire.getAustucultation()));
        else
            examenPleuroPulmonaire.setAustucultation("HIDDEN");

        if (!hiddenFields.contains("frequence_respiratoire"))
            examenPleuroPulmonaire.setFrequence_respiratoire(decryptIfNotNull(examenPleuroPulmonaire.getFrequence_respiratoire()));
        else
            examenPleuroPulmonaire.setFrequence_respiratoire("HIDDEN");

        if (!hiddenFields.contains("inspection"))
            examenPleuroPulmonaire.setInspection(decryptIfNotNull(examenPleuroPulmonaire.getInspection()));
        else
            examenPleuroPulmonaire.setInspection("HIDDEN");

        return examenPleuroPulmonaire;
    }





    public void updateExamenPleuroPulmonique(int jockeyId, ExamenPleuroPulmonaire examenPleuroPulmonaire) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        examenPleuroPulmonaire.setDossierMedicale(dossierMedicale);
        examenPleuroPulmonaire.setInspection(encryptIfNotNull(examenPleuroPulmonaire.getAustucultation()));
        examenPleuroPulmonaire.setAustucultation(encryptIfNotNull(examenPleuroPulmonaire.getAustucultation()));
        examenPleuroPulmonaire.setFrequence_respiratoire(encryptIfNotNull(examenPleuroPulmonaire.getFrequence_respiratoire()));
        examenPleuroPulmonaireRepo.save(examenPleuroPulmonaire);
    }
}
