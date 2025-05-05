package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenNeurologique;
import omnidoc.backend.entity.examens.ExamenPleuroPulmonaire;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenNeurologiqueRepo;
import org.springframework.stereotype.Service;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ExamenNeurologiqueService {

    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ExamenNeurologiqueRepo examenNeurologiqueRepo;

    public ExamenNeurologiqueService(DossierMedicaleRepo dossierMedicaleRepo, ExamenNeurologiqueRepo examenNeurologiqueRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.examenNeurologiqueRepo = examenNeurologiqueRepo;
    }

    public ExamenNeurologique fetchExamenPleuroPulmonique(int jockeyId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        ExamenNeurologique examenNeurologique = dossierMedicale.getExamenNeurologique();
        examenNeurologique.setReflexePupillaire(decryptIfNotNull(examenNeurologique.getReflexePupillaire()));
        examenNeurologique.setReflexesOstéoTendineux(decryptIfNotNull(examenNeurologique.getReflexesOstéoTendineux()));
        examenNeurologique.setCoordination(decryptIfNotNull(examenNeurologique.getCoordination()));
        examenNeurologique.setEquilibre(decryptIfNotNull(examenNeurologique.getEquilibre()));
        examenNeurologique.setSensibilite(decryptIfNotNull(examenNeurologique.getSensibilite()));
        examenNeurologique.setMotricite(decryptIfNotNull(examenNeurologique.getMotricite()));
        examenNeurologique.setTonicite(decryptIfNotNull(examenNeurologique.getTonicite()));
        examenNeurologique.setAutres(decryptIfNotNull(examenNeurologique.getAutres()));

        return examenNeurologique;
    }

    public void updateExamenNeurologique(int jockeyId, ExamenNeurologique examenNeurologique) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        examenNeurologique.setDossierMedicale(dossierMedicale);
        examenNeurologique.setReflexePupillaire(encryptIfNotNull(examenNeurologique.getReflexePupillaire()));
        examenNeurologique.setReflexesOstéoTendineux(encryptIfNotNull(examenNeurologique.getReflexesOstéoTendineux()));
        examenNeurologique.setReflexePupillaire(encryptIfNotNull(examenNeurologique.getReflexePupillaire()));
        examenNeurologique.setReflexePupillaire(encryptIfNotNull(examenNeurologique.getReflexePupillaire()));
        examenNeurologique.setReflexePupillaire(encryptIfNotNull(examenNeurologique.getReflexePupillaire()));
        examenNeurologique.setReflexePupillaire(encryptIfNotNull(examenNeurologique.getReflexePupillaire()));
        examenNeurologique.setReflexePupillaire(encryptIfNotNull(examenNeurologique.getReflexePupillaire()));
        examenNeurologique.setReflexePupillaire(encryptIfNotNull(examenNeurologique.getReflexePupillaire()));
        examenNeurologiqueRepo.save(examenNeurologique);
    }
}
