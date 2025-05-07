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

import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenLocomoteurService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ParametresExamenLocomoteurRepo parametresExamenLocomoteurRepo;
    private final ExamenLocomoteurRepo examenLocomoteurRepo;

    public ExamenLocomoteurService(DossierMedicaleRepo dossierMedicaleRepo, ParametresExamenLocomoteurRepo parametresExamenLocomoteurRepo, ExamenLocomoteurRepo examenLocomoteurRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.parametresExamenLocomoteurRepo = parametresExamenLocomoteurRepo;
        this.examenLocomoteurRepo = examenLocomoteurRepo;
    }

    public ExamenLocomoteur fetchExamenLocomoteur(int jockeyId) throws Exception {
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
        examenLocomoteur.setForceGenoux(Util.decryptIfNotNull(examenLocomoteur.getForceGenoux()));
        examenLocomoteur.setForceTendons(Util.decryptIfNotNull(examenLocomoteur.getForceTendons()));
        examenLocomoteur.setForceEpaule(Util.decryptIfNotNull(examenLocomoteur.getForceEpaule()));
        examenLocomoteur.setForcePoignet(Util.decryptIfNotNull(examenLocomoteur.getForcePoignet()));
        examenLocomoteur.setForceCoude(Util.decryptIfNotNull(examenLocomoteur.getForceCoude()));
        examenLocomoteur.setForceCheville(Util.decryptIfNotNull(examenLocomoteur.getForceCheville()));
        examenLocomoteur.setForceHanche(Util.decryptIfNotNull(examenLocomoteur.getForceHanche()));

        for (ParametresExamenLocomoteur parametresExamenLocomoteur : examenLocomoteur.getParametresExamenLocomoteurs()) {
            parametresExamenLocomoteur.setHasCondition(Util.decryptIfNotNull(parametresExamenLocomoteur.getHasCondition()));
            parametresExamenLocomoteur.setObservations(Util.decryptIfNotNull(parametresExamenLocomoteur.getObservations()));
        }
        return examenLocomoteur;
    }


    public void updateExamenLocomoteur(int jockeyId,ExamenLocomoteur examenLocomoteur) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        examenLocomoteur.setForceGenoux(Util.encryptIfNotNull(examenLocomoteur.getForceGenoux()));
        examenLocomoteur.setForceTendons(Util.encryptIfNotNull(examenLocomoteur.getForceTendons()));
        examenLocomoteur.setForceEpaule(Util.encryptIfNotNull(examenLocomoteur.getForceEpaule()));
        examenLocomoteur.setForcePoignet(Util.encryptIfNotNull(examenLocomoteur.getForcePoignet()));
        examenLocomoteur.setForceCoude(Util.encryptIfNotNull(examenLocomoteur.getForceCoude()));
        examenLocomoteur.setForceCheville(Util.encryptIfNotNull(examenLocomoteur.getForceCheville()));
        examenLocomoteur.setForceHanche(Util.encryptIfNotNull(examenLocomoteur.getForceHanche()));
        examenLocomoteur.setDossierMedicale(dossierMedicale);

        List<ParametresExamenLocomoteur> encryptedParams = examenLocomoteur.getParametresExamenLocomoteurs().stream().map(param -> {
            try {
                param.setHasCondition(encryptIfNotNull(param.getHasCondition()));
                param.setObservations(encryptIfNotNull(param.getObservations()));
                param.setExamenLocomoteur(examenLocomoteur);
                return param;
            } catch (Exception e) {
                throw new ApiException("Erreur de chiffrement d’un paramètre: " + e.getMessage());
            }
        }).toList();

        parametresExamenLocomoteurRepo.saveAll(encryptedParams);
        examenLocomoteur.setDossierMedicale(dossierMedicale);
        examenLocomoteurRepo.save(examenLocomoteur);

    }
}
