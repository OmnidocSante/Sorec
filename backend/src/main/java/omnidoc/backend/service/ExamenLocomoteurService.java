package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenLocomoteur;
import omnidoc.backend.entity.examens.parametresExamens.ParametresExamenLocomoteur;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenLocomoteurRepo;
import omnidoc.backend.repository.ParametresExamenLocomoteurRepo;
import omnidoc.backend.util.Util;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenLocomoteurService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ParametresExamenLocomoteurRepo parametresExamenLocomoteurRepo;
    private final ExamenLocomoteurRepo examenLocomoteurRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    public ExamenLocomoteurService(DossierMedicaleRepo dossierMedicaleRepo, ParametresExamenLocomoteurRepo parametresExamenLocomoteurRepo, ExamenLocomoteurRepo examenLocomoteurRepo, FieldVisibilityService fieldVisibilityService, AccessService accessService) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.parametresExamenLocomoteurRepo = parametresExamenLocomoteurRepo;
        this.examenLocomoteurRepo = examenLocomoteurRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }

    public ExamenLocomoteur fetchExamenLocomoteur(int jockeyId) throws Exception {
        accessService.verifyAccess(jockeyId);

        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        return getExamenLocomoteur(dossierMedicale);

    }

    public ExamenLocomoteur fetchExamenLocomoteurByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.findById(dossierId).orElseThrow(() -> new ApiException("not found"));
        return getExamenLocomoteur(dossierMedicale);

    }

    private ExamenLocomoteur getExamenLocomoteur(DossierMedicale dossierMedicale) throws Exception {
        ExamenLocomoteur examenLocomoteur = dossierMedicale.getExamenLocomoteur();
        examenLocomoteur.setDossierMedicale(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("examen_locomoteur");

        if (!hiddenFields.contains("force_genoux"))
            examenLocomoteur.setForceGenoux(Util.decryptIfNotNull(examenLocomoteur.getForceGenoux()));
        else
            examenLocomoteur.setForceGenoux("HIDDEN");

        if (!hiddenFields.contains("force_tendons"))
            examenLocomoteur.setForceTendons(Util.decryptIfNotNull(examenLocomoteur.getForceTendons()));
        else
            examenLocomoteur.setForceTendons("HIDDEN");

        if (!hiddenFields.contains("force_epaule"))
            examenLocomoteur.setForceEpaule(Util.decryptIfNotNull(examenLocomoteur.getForceEpaule()));
        else
            examenLocomoteur.setForceEpaule("HIDDEN");

        if (!hiddenFields.contains("force_poignet"))
            examenLocomoteur.setForcePoignet(Util.decryptIfNotNull(examenLocomoteur.getForcePoignet()));
        else
            examenLocomoteur.setForcePoignet("HIDDEN");

        if (!hiddenFields.contains("force_coude"))
            examenLocomoteur.setForceCoude(Util.decryptIfNotNull(examenLocomoteur.getForceCoude()));
        else
            examenLocomoteur.setForceCoude("HIDDEN");

        if (!hiddenFields.contains("force_cheville"))
            examenLocomoteur.setForceCheville(Util.decryptIfNotNull(examenLocomoteur.getForceCheville()));
        else
            examenLocomoteur.setForceCheville("HIDDEN");

        if (!hiddenFields.contains("force_hanche"))
            examenLocomoteur.setForceHanche(Util.decryptIfNotNull(examenLocomoteur.getForceHanche()));
        else
            examenLocomoteur.setForceHanche("HIDDEN");

        if (!hiddenFields.contains("souplesse_musculaire"))
            examenLocomoteur.setSouplesseMusculaire(Util.decryptIfNotNull(examenLocomoteur.getSouplesseMusculaire()));
        else
            examenLocomoteur.setSouplesseMusculaire("HIDDEN");

        for (ParametresExamenLocomoteur parametresExamenLocomoteur : examenLocomoteur.getParametresExamenLocomoteurs()) {
            parametresExamenLocomoteur.setHasCondition(Util.decryptIfNotNull(parametresExamenLocomoteur.getHasCondition()));
            parametresExamenLocomoteur.setObservations(Util.decryptIfNotNull(parametresExamenLocomoteur.getObservations()));
        }

        return examenLocomoteur;
    }


    public void updateExamenLocomoteur(int jockeyId, ExamenLocomoteur examenLocomoteur) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        examenLocomoteur.setDossierMedicale(dossierMedicale);
        examenLocomoteur.setForceGenoux(Util.encryptIfNotNull(examenLocomoteur.getForceGenoux()));
        examenLocomoteur.setForceTendons(Util.encryptIfNotNull(examenLocomoteur.getForceTendons()));
        examenLocomoteur.setForceEpaule(Util.encryptIfNotNull(examenLocomoteur.getForceEpaule()));
        examenLocomoteur.setForcePoignet(Util.encryptIfNotNull(examenLocomoteur.getForcePoignet()));
        examenLocomoteur.setForceCoude(Util.encryptIfNotNull(examenLocomoteur.getForceCoude()));
        examenLocomoteur.setForceCheville(Util.encryptIfNotNull(examenLocomoteur.getForceCheville()));
        examenLocomoteur.setForceHanche(Util.encryptIfNotNull(examenLocomoteur.getForceHanche()));

        List<ParametresExamenLocomoteur> encryptedParams = examenLocomoteur.getParametresExamenLocomoteurs().stream().map(param -> {
            try {
                param.setHasCondition(encryptIfNotNull(param.getHasCondition()));
                param.setObservations(encryptIfNotNull(param.getObservations()));
                param.setExamenLocomoteur(dossierMedicale.getExamenLocomoteur());
                return param;
            } catch (Exception e) {
                throw new ApiException("Erreur de chiffrement d’un paramètre: " + e.getMessage());
            }
        }).toList();
        System.out.println("test");

        parametresExamenLocomoteurRepo.saveAll(encryptedParams);
        examenLocomoteurRepo.save(examenLocomoteur);

    }
}
