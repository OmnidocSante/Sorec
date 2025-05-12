package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenCardioVasculaire;
import omnidoc.backend.entity.examens.parametresExamens.ParametresExamenCardioVasculaire;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenCardioVasculaireRepo;

import omnidoc.backend.repository.parametresExamenCardioVasculaireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenCardioVasculaireService {
    @Autowired
    private DossierMedicaleRepo dossierMedicaleRepo;
    @Autowired
    private ExamenCardioVasculaireRepo examenCardioVasculaireRepo;

    @Autowired
    private parametresExamenCardioVasculaireRepo parametresExamenCardioVasculaireRepo;
    @Autowired
    private FieldVisibilityService fieldVisibilityService;
    @Autowired
    private AccessService accessService;


    public ExamenCardioVasculaire getExamenByPatientId(int jockeyId) throws Exception {
        accessService
                .verifyAccess(jockeyId);

        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("Dossier médical non trouvé"));

        return getExamenCardioVasculaire(dossierMedicale);
    }

    public ExamenCardioVasculaire getExamenByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.findById(dossierId).orElseThrow(() -> new ApiException("Dossier médical non trouvé"));

        return getExamenCardioVasculaire(dossierMedicale);
    }

    private ExamenCardioVasculaire getExamenCardioVasculaire(DossierMedicale dossierMedicale) throws Exception {
        ExamenCardioVasculaire examenCardioVasculaire = dossierMedicale.getExamenCardioVasculaire();
        examenCardioVasculaire.setDossierMedicale(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("examen_cardio_vasculaire");

        if (!hiddenFields.contains("ausculation_debout"))
            examenCardioVasculaire.setAusculationDebout(decryptIfNotNull(examenCardioVasculaire.getAusculationDebout()));
        else
            examenCardioVasculaire.setAusculationDebout("HIDDEN");

        if (!hiddenFields.contains("ausculation_observation"))
            examenCardioVasculaire.setAusculationObservation(decryptIfNotNull(examenCardioVasculaire.getAusculationObservation()));
        else
            examenCardioVasculaire.setAusculationObservation("HIDDEN");

        if (!hiddenFields.contains("ausculation_couche"))
            examenCardioVasculaire.setAusculationCouche(decryptIfNotNull(examenCardioVasculaire.getAusculationCouche()));
        else
            examenCardioVasculaire.setAusculationCouche("HIDDEN");

        if (!hiddenFields.contains("tension_couche"))
            examenCardioVasculaire.setTensionCouche(decryptIfNotNull(examenCardioVasculaire.getTensionCouche()));
        else
            examenCardioVasculaire.setTensionCouche("HIDDEN");

        if (!hiddenFields.contains("tension_debout"))
            examenCardioVasculaire.setTensionDebout(decryptIfNotNull(examenCardioVasculaire.getTensionDebout()));
        else
            examenCardioVasculaire.setTensionDebout("HIDDEN");

        if (!hiddenFields.contains("tension_observation"))
            examenCardioVasculaire.setTensionObservation(decryptIfNotNull(examenCardioVasculaire.getTensionObservation()));
        else
            examenCardioVasculaire.setTensionObservation("HIDDEN");

        if (!hiddenFields.contains("frequence_couche"))
            examenCardioVasculaire.setFrequenceCouche(decryptIfNotNull(examenCardioVasculaire.getFrequenceCouche()));
        else
            examenCardioVasculaire.setFrequenceCouche("HIDDEN");

        if (!hiddenFields.contains("frequence_debout"))
            examenCardioVasculaire.setFrequenceDebout(decryptIfNotNull(examenCardioVasculaire.getFrequenceDebout()));
        else
            examenCardioVasculaire.setFrequenceDebout("HIDDEN");

        if (!hiddenFields.contains("frequence_observation"))
            examenCardioVasculaire.setFrequenceObservation(decryptIfNotNull(examenCardioVasculaire.getFrequenceObservation()));
        else
            examenCardioVasculaire.setFrequenceObservation("HIDDEN");

        List<ParametresExamenCardioVasculaire> decryptedParametres = examenCardioVasculaire.getParametresExamenCardioVasculaires().stream().map(param -> {
            try {
                ParametresExamenCardioVasculaire decrypted = new ParametresExamenCardioVasculaire();
                decrypted.setId(param.getId());
                decrypted.setParametresCardioVasculaire(param.getParametresCardioVasculaire());
                decrypted.setExamenCardioVasculaire(param.getExamenCardioVasculaire());
                decrypted.setHasCondition(decryptIfNotNull(param.getHasCondition()));
                decrypted.setObservations(decryptIfNotNull(param.getObservations()));
                return decrypted;
            } catch (Exception e) {
                throw new ApiException("Erreur de déchiffrement d’un paramètre: " + e.getMessage());
            }
        }).toList();

        examenCardioVasculaire.setParametresExamenCardioVasculaires(decryptedParametres);
        examenCardioVasculaire.setDossierMedicale(dossierMedicale);

        return examenCardioVasculaire;
    }

    public void modifyExamenByPatientId(int jockeyId, ExamenCardioVasculaire examenCardioVasculaire) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("Dossier médical non trouvé"));

        examenCardioVasculaire.setAusculationDebout(encryptIfNotNull(examenCardioVasculaire.getAusculationDebout()));
        examenCardioVasculaire.setAusculationObservation(encryptIfNotNull(examenCardioVasculaire.getAusculationObservation()));
        examenCardioVasculaire.setAusculationCouche(encryptIfNotNull(examenCardioVasculaire.getAusculationCouche()));
        examenCardioVasculaire.setTensionCouche(encryptIfNotNull(examenCardioVasculaire.getTensionCouche()));
        examenCardioVasculaire.setTensionDebout(encryptIfNotNull(examenCardioVasculaire.getTensionDebout()));
        examenCardioVasculaire.setTensionObservation(encryptIfNotNull(examenCardioVasculaire.getTensionObservation()));
        examenCardioVasculaire.setFrequenceCouche(encryptIfNotNull(examenCardioVasculaire.getFrequenceCouche()));
        examenCardioVasculaire.setFrequenceDebout(encryptIfNotNull(examenCardioVasculaire.getFrequenceDebout()));
        examenCardioVasculaire.setFrequenceObservation(encryptIfNotNull(examenCardioVasculaire.getFrequenceObservation()));
        System.out.println("done");

        List<ParametresExamenCardioVasculaire> encryptedParams = examenCardioVasculaire.getParametresExamenCardioVasculaires().stream().map(param -> {
            try {
                param.setHasCondition(encryptIfNotNull(param.getHasCondition()));
                param.setObservations(encryptIfNotNull(param.getObservations()));
                param.setExamenCardioVasculaire(examenCardioVasculaire);
                return param;
            } catch (Exception e) {
                throw new ApiException("Erreur de chiffrement d’un paramètre: " + e.getMessage());
            }
        }).toList();

        parametresExamenCardioVasculaireRepo.saveAll(encryptedParams);
        examenCardioVasculaire.setDossierMedicale(dossierMedicale);
        examenCardioVasculaireRepo.save(examenCardioVasculaire);
    }


}
