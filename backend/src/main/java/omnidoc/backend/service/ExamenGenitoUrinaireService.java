package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenGenitoUrinaire;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenGenitoUrinaireRepo;
import org.springframework.stereotype.Service;

import java.util.Set;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenGenitoUrinaireService {

    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ExamenGenitoUrinaireRepo examenGenitoUrinaireRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    public ExamenGenitoUrinaireService(DossierMedicaleRepo dossierMedicaleRepo, ExamenGenitoUrinaireRepo examenGenitoUrinaireRepo, FieldVisibilityService fieldVisibilityService, AccessService accessService) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.examenGenitoUrinaireRepo = examenGenitoUrinaireRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }

    public ExamenGenitoUrinaire fetchExamenGenitoUrinaire(int jockeyId) throws Exception {
        accessService.verifyAccess(jockeyId);

        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        return getExamenGenitoUrinaire(dossierMedicale);
    }
    public ExamenGenitoUrinaire fetchExamenGenitoUrinaireByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.findById(dossierId).orElseThrow(() -> new ApiException("not found"));
        return getExamenGenitoUrinaire(dossierMedicale);
    }

    private ExamenGenitoUrinaire getExamenGenitoUrinaire(DossierMedicale dossierMedicale) throws Exception {

        ExamenGenitoUrinaire examenGenitoUrinaire = dossierMedicale.getExamenGenitoUrinaire();
        examenGenitoUrinaire.setDossierMedicale(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("examen_genito_urinaire");

        if (!hiddenFields.contains("observation_glucose"))
            examenGenitoUrinaire.setObservationGlucose(decryptIfNotNull(examenGenitoUrinaire.getObservationGlucose()));
        else
            examenGenitoUrinaire.setObservationGlucose("HIDDEN");

        if (!hiddenFields.contains("valeur_sang"))
            examenGenitoUrinaire.setValeurSang(decryptIfNotNull(examenGenitoUrinaire.getValeurSang()));
        else
            examenGenitoUrinaire.setValeurSang("HIDDEN");

        if (!hiddenFields.contains("observation_albumine"))
            examenGenitoUrinaire.setObservationAlbumine(decryptIfNotNull(examenGenitoUrinaire.getObservationAlbumine()));
        else
            examenGenitoUrinaire.setObservationAlbumine("HIDDEN");

        if (!hiddenFields.contains("valeur_albumine"))
            examenGenitoUrinaire.setValeurAlbumine(decryptIfNotNull(examenGenitoUrinaire.getValeurAlbumine()));
        else
            examenGenitoUrinaire.setValeurAlbumine("HIDDEN");

        if (!hiddenFields.contains("observation_sang"))
            examenGenitoUrinaire.setObservationSang(decryptIfNotNull(examenGenitoUrinaire.getObservationSang()));
        else
            examenGenitoUrinaire.setObservationSang("HIDDEN");

        if (!hiddenFields.contains("observation_autres"))
            examenGenitoUrinaire.setObservationAutres(decryptIfNotNull(examenGenitoUrinaire.getObservationAutres()));
        else
            examenGenitoUrinaire.setObservationAutres("HIDDEN");

        if (!hiddenFields.contains("valeur_autres"))
            examenGenitoUrinaire.setValeurAutres(decryptIfNotNull(examenGenitoUrinaire.getValeurAutres()));
        else
            examenGenitoUrinaire.setValeurAutres("HIDDEN");

        if (!hiddenFields.contains("valeur_glucose"))
            examenGenitoUrinaire.setValeurGlucose(decryptIfNotNull(examenGenitoUrinaire.getValeurGlucose()));
        else
            examenGenitoUrinaire.setValeurGlucose("HIDDEN");

        return examenGenitoUrinaire;
    }



    public void updateExamenGenitoUrinaire(int jockeyId, ExamenGenitoUrinaire examenGenitoUrinaire) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        examenGenitoUrinaire.setDossierMedicale(dossierMedicale);
        examenGenitoUrinaire.setObservationGlucose(encryptIfNotNull(examenGenitoUrinaire.getObservationGlucose()));
        examenGenitoUrinaire.setObservationAlbumine(encryptIfNotNull(examenGenitoUrinaire.getObservationAlbumine()));
        examenGenitoUrinaire.setValeurAlbumine(encryptIfNotNull(examenGenitoUrinaire.getValeurAlbumine()));
        examenGenitoUrinaire.setObservationSang(encryptIfNotNull(examenGenitoUrinaire.getObservationSang()));
        examenGenitoUrinaire.setValeurSang(encryptIfNotNull(examenGenitoUrinaire.getValeurSang()));
        examenGenitoUrinaire.setObservationAutres(encryptIfNotNull(examenGenitoUrinaire.getObservationAutres()));
        examenGenitoUrinaire.setValeurAutres(encryptIfNotNull(examenGenitoUrinaire.getValeurAutres()));
        examenGenitoUrinaire.setValeurGlucose(encryptIfNotNull(examenGenitoUrinaire.getValeurGlucose()));
        examenGenitoUrinaireRepo.save(examenGenitoUrinaire);
    }
}
