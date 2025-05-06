package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenAbdominal;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenAbdominalRepo;
import org.springframework.stereotype.Service;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenAbdominalService {

    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ExamenAbdominalRepo examenAbdominalRepo;

    public ExamenAbdominalService(DossierMedicaleRepo dossierMedicaleRepo, ExamenAbdominalRepo examenAbdominalRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.examenAbdominalRepo = examenAbdominalRepo;
    }

    public ExamenAbdominal fetchExamenAbdominal(int jockeyId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        ExamenAbdominal examenAbdominal = dossierMedicale.getExamenAbdominal();
        examenAbdominal.setDossierMedicale(dossierMedicale);
        examenAbdominal.setOropharynx(decryptIfNotNull(examenAbdominal.getOropharynx()));
        examenAbdominal.setFoie(decryptIfNotNull(examenAbdominal.getFoie()));
        examenAbdominal.setRate(decryptIfNotNull(examenAbdominal.getRate()));
        examenAbdominal.setAutres(decryptIfNotNull(examenAbdominal.getAutres()));
        return examenAbdominal;
    }

    public void updateExamenAbdominal(int jockeyId, ExamenAbdominal examenAbdominal) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        examenAbdominal.setDossierMedicale(dossierMedicale);
        examenAbdominal.setOropharynx(encryptIfNotNull(examenAbdominal.getOropharynx()));
        examenAbdominal.setFoie(encryptIfNotNull(examenAbdominal.getFoie()));
        examenAbdominal.setRate(encryptIfNotNull(examenAbdominal.getRate()));
        examenAbdominal.setAutres(encryptIfNotNull(examenAbdominal.getAutres()));
        examenAbdominalRepo.save(examenAbdominal);
    }
}
