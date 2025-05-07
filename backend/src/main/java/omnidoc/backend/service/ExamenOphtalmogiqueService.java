package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenOphtalmogique;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenOphtalmogiqueRepo;
import org.springframework.stereotype.Service;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenOphtalmogiqueService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ExamenOphtalmogiqueRepo examenOphtalmogiqueRepo;

    public ExamenOphtalmogiqueService(DossierMedicaleRepo dossierMedicaleRepo, ExamenOphtalmogiqueRepo examenOphtalmogiqueRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.examenOphtalmogiqueRepo = examenOphtalmogiqueRepo;
    }

    public ExamenOphtalmogique fetchExamenOphtalmogique(int jockeyId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        return getExamenOphtalmogique(dossierMedicale);

    }

    public ExamenOphtalmogique fetchExamenOphtalmogiqueByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.findById(dossierId).orElseThrow(() -> new ApiException("not found"));
        return getExamenOphtalmogique(dossierMedicale);

    }

    private ExamenOphtalmogique getExamenOphtalmogique(DossierMedicale dossierMedicale) throws Exception {
        ExamenOphtalmogique examenOphtalmogique = dossierMedicale.getExamenOphtalmogique();
        examenOphtalmogique.setDossierMedicale(dossierMedicale);
        examenOphtalmogique.setOgCorrige(decryptIfNotNull(examenOphtalmogique.getOgCorrige()));
        examenOphtalmogique.setOgNonCorrige(decryptIfNotNull(examenOphtalmogique.getOgNonCorrige()));
        examenOphtalmogique.setOdNonCorrige(decryptIfNotNull(examenOphtalmogique.getOdNonCorrige()));
        examenOphtalmogique.setOdCorrige(decryptIfNotNull(examenOphtalmogique.getOdCorrige()));
        examenOphtalmogique.setPaupieresEtCorneesNormale(decryptIfNotNull(examenOphtalmogique.getPaupieresEtCorneesNormale()));
        return examenOphtalmogique;
    }

    public void updateExamenOphtalmogique(int jockeyId, ExamenOphtalmogique examenOphtalmogique) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        examenOphtalmogique.setDossierMedicale(dossierMedicale);
        examenOphtalmogique.setOgCorrige(encryptIfNotNull(examenOphtalmogique.getOgCorrige()));
        examenOphtalmogique.setOgNonCorrige(encryptIfNotNull(examenOphtalmogique.getOgNonCorrige()));
        examenOphtalmogique.setOdNonCorrige(encryptIfNotNull(examenOphtalmogique.getOdNonCorrige()));
        examenOphtalmogique.setOdCorrige(encryptIfNotNull(examenOphtalmogique.getOdCorrige()));
        examenOphtalmogique.setPaupieresEtCorneesNormale(encryptIfNotNull(examenOphtalmogique.getPaupieresEtCorneesNormale()));
        examenOphtalmogiqueRepo.save(examenOphtalmogique);
    }
}
