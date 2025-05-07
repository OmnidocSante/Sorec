package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenPleuroPulmonaire;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenPleuroPulmonaireRepo;
import org.springframework.stereotype.Service;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenPleuroPulmonaireService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ExamenPleuroPulmonaireRepo examenPleuroPulmonaireRepo;

    public ExamenPleuroPulmonaireService(DossierMedicaleRepo dossierMedicaleRepo, ExamenPleuroPulmonaireRepo examenPleuroPulmonaireRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.examenPleuroPulmonaireRepo = examenPleuroPulmonaireRepo;
    }

    public ExamenPleuroPulmonaire fetchExamenPleuroPulmonique(int jockeyId) throws Exception {
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
        examenPleuroPulmonaire.setAustucultation(decryptIfNotNull(examenPleuroPulmonaire.getAustucultation()));
        examenPleuroPulmonaire.setFrequence_respiratoire(decryptIfNotNull(examenPleuroPulmonaire.getFrequence_respiratoire()));
        examenPleuroPulmonaire.setInspection(decryptIfNotNull(examenPleuroPulmonaire.getInspection()));
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
