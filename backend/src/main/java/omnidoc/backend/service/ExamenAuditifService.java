package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenAuditif;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ExamenAuditifRepo;
import omnidoc.backend.util.Util;
import org.springframework.stereotype.Service;

@Service
public class ExamenAuditifService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ExamenAuditifRepo examenAuditifRepo;

    public ExamenAuditifService(DossierMedicaleRepo dossierMedicaleRepo, ExamenAuditifRepo examenAuditifRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.examenAuditifRepo = examenAuditifRepo;
    }

    public ExamenAuditif fetchExamenAuditif(int jockeyId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        ExamenAuditif examenAuditif = dossierMedicale.getExamenAuditif();
        examenAuditif.setDossierMedicale(dossierMedicale);
        examenAuditif.setAcuiteAuditiveADistanceOg(Util.decryptIfNotNull(examenAuditif.getAcuiteAuditiveADistanceOg()));
        examenAuditif.setAcuiteAuditiveADistanceOd(Util.decryptIfNotNull(examenAuditif.getAcuiteAuditiveADistanceOd()));
        examenAuditif.setConduitAuditifEtMembranesTympaniqueNormales(Util.decryptIfNotNull(examenAuditif.getConduitAuditifEtMembranesTympaniqueNormales()));
        return examenAuditif;
    }

    public void updateExamenAuditif(int jockeyId, ExamenAuditif examenAuditif) throws Exception{
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        examenAuditif.setDossierMedicale(dossierMedicale);
        examenAuditif.setAcuiteAuditiveADistanceOg(Util.encryptIfNotNull(examenAuditif.getAcuiteAuditiveADistanceOg()));
        examenAuditif.setAcuiteAuditiveADistanceOd(Util.encryptIfNotNull(examenAuditif.getAcuiteAuditiveADistanceOd()));
        examenAuditif.setConduitAuditifEtMembranesTympaniqueNormales(Util.encryptIfNotNull(examenAuditif.getConduitAuditifEtMembranesTympaniqueNormales()));
        examenAuditifRepo.save(examenAuditif);
    }


}
