package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenAbdominal;
import omnidoc.backend.entity.examens.ExamenGenitoUrinaire;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenGenitoUrinaireRepo;
import org.springframework.stereotype.Service;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenGenitoUrinaireService {

    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ExamenGenitoUrinaireRepo examenGenitoUrinaireRepo;

    public ExamenGenitoUrinaireService(DossierMedicaleRepo dossierMedicaleRepo, ExamenGenitoUrinaireRepo examenGenitoUrinaireRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.examenGenitoUrinaireRepo = examenGenitoUrinaireRepo;
    }

    public ExamenGenitoUrinaire fetchExamenGenitoUrinaire(int jockeyId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        ExamenGenitoUrinaire examenGenitoUrinaire = dossierMedicale.getExamenGenitoUrinaire();
        examenGenitoUrinaire.setObservationGlucose(decryptIfNotNull(examenGenitoUrinaire.getObservationGlucose()));
        examenGenitoUrinaire.setValeurSang(decryptIfNotNull(examenGenitoUrinaire.getValeurSang()));
        examenGenitoUrinaire.setObservationAlbumine(decryptIfNotNull(examenGenitoUrinaire.getObservationAlbumine()));
        examenGenitoUrinaire.setValeurAlbumine(decryptIfNotNull(examenGenitoUrinaire.getValeurAlbumine()));
        examenGenitoUrinaire.setObservationSang(decryptIfNotNull(examenGenitoUrinaire.getObservationSang()));
        examenGenitoUrinaire.setValeurSang(decryptIfNotNull(examenGenitoUrinaire.getValeurSang()));
        examenGenitoUrinaire.setObservationAutres(decryptIfNotNull(examenGenitoUrinaire.getObservationAutres()));
        examenGenitoUrinaire.setValeurAutres(decryptIfNotNull(examenGenitoUrinaire.getValeurAutres()));
        return examenGenitoUrinaire;
    }

    public void updateExamenGenitoUrinaire(int jockeyId, ExamenGenitoUrinaire examenGenitoUrinaire) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        examenGenitoUrinaire.setDossierMedicale(dossierMedicale);
        examenGenitoUrinaire.setObservationGlucose(encryptIfNotNull(examenGenitoUrinaire.getObservationGlucose()));
        examenGenitoUrinaire.setValeurSang(encryptIfNotNull(examenGenitoUrinaire.getValeurSang()));
        examenGenitoUrinaire.setObservationAlbumine(encryptIfNotNull(examenGenitoUrinaire.getObservationAlbumine()));
        examenGenitoUrinaire.setValeurAlbumine(encryptIfNotNull(examenGenitoUrinaire.getValeurAlbumine()));
        examenGenitoUrinaire.setObservationSang(encryptIfNotNull(examenGenitoUrinaire.getObservationSang()));
        examenGenitoUrinaire.setValeurSang(encryptIfNotNull(examenGenitoUrinaire.getValeurSang()));
        examenGenitoUrinaire.setObservationAutres(encryptIfNotNull(examenGenitoUrinaire.getObservationAutres()));
        examenGenitoUrinaire.setValeurAutres(encryptIfNotNull(examenGenitoUrinaire.getValeurAutres()));
        examenGenitoUrinaireRepo.save(examenGenitoUrinaire);
    }
}
