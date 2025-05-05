package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.resultat.Conclusion;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.ConclusionRepo;
import omnidoc.backend.repository.DossierMedicaleRepo;
import org.springframework.stereotype.Service;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ConclusionService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ConclusionRepo conclusionRepo;

    public ConclusionService(DossierMedicaleRepo dossierMedicaleRepo, ConclusionRepo conclusionRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.conclusionRepo = conclusionRepo;
    }

    public Conclusion fetchConclusion(int jockeyId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        Conclusion conclusion = dossierMedicale.getConclusion();
        conclusion.setCardioVasculaire(decryptIfNotNull(conclusion.getCardioVasculaire()));
        conclusion.setPleuropulmonaire(decryptIfNotNull(conclusion.getPleuropulmonaire()));
        conclusion.setOphtalmique(decryptIfNotNull(conclusion.getOphtalmique()));
        conclusion.setAuditif(decryptIfNotNull(conclusion.getAuditif()));
        conclusion.setNeurologique(decryptIfNotNull(conclusion.getNeurologique()));
        conclusion.setAbdominal(decryptIfNotNull(conclusion.getAbdominal()));
        conclusion.setUrogénital(decryptIfNotNull(conclusion.getUrogénital()));
        conclusion.setParaclinique(decryptIfNotNull(conclusion.getParaclinique()));


        return conclusion;
    }

    public void updateConclusion(int jockeyId, Conclusion conclusion) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        conclusion.setCardioVasculaire(encryptIfNotNull(conclusion.getCardioVasculaire()));
        conclusion.setPleuropulmonaire(encryptIfNotNull(conclusion.getPleuropulmonaire()));
        conclusion.setOphtalmique(encryptIfNotNull(conclusion.getOphtalmique()));
        conclusion.setAuditif(encryptIfNotNull(conclusion.getAuditif()));
        conclusion.setNeurologique(encryptIfNotNull(conclusion.getNeurologique()));
        conclusion.setAbdominal(encryptIfNotNull(conclusion.getAbdominal()));
        conclusion.setUrogénital(encryptIfNotNull(conclusion.getUrogénital()));
        conclusion.setParaclinique(encryptIfNotNull(conclusion.getParaclinique()));
        conclusion.setDossierMedicale(dossierMedicale);
        conclusionRepo.save(conclusion);
    }
}
