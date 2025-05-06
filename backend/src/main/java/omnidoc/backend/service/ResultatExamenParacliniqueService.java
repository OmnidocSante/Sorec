package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.resultat.ResultatExamenParaclinique;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ResultatExamenParacliniqueRepo;
import org.springframework.stereotype.Service;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ResultatExamenParacliniqueService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ResultatExamenParacliniqueRepo resultatExamenParacliniqueRepo;

    public ResultatExamenParacliniqueService(DossierMedicaleRepo dossierMedicaleRepo, ResultatExamenParacliniqueRepo resultatExamenParacliniqueRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.resultatExamenParacliniqueRepo = resultatExamenParacliniqueRepo;
    }

    public ResultatExamenParaclinique fetchResultatExamenParaclinique(int jockeyId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        ResultatExamenParaclinique resultatExamenParaclinique = dossierMedicale.getResultatExamenParaclinique();
        resultatExamenParaclinique.setDossierMedicale(dossierMedicale);
        resultatExamenParaclinique.setEchocardiographie(decryptIfNotNull(resultatExamenParaclinique.getEchocardiographie()));
        resultatExamenParaclinique.setTensionArtériellALeffort(decryptIfNotNull(resultatExamenParaclinique.getTensionArtériellALeffort()));
        resultatExamenParaclinique.setTensionArterielleAuRepos(decryptIfNotNull(resultatExamenParaclinique.getTensionArterielleAuRepos()));
        resultatExamenParaclinique.setRadiographieDuRachisLombaire(decryptIfNotNull(resultatExamenParaclinique.getRadiographieDuRachisLombaire()));
        resultatExamenParaclinique.setRadiographieDuPoumon(decryptIfNotNull(resultatExamenParaclinique.getRadiographieDuPoumon()));

        return resultatExamenParaclinique;
    }

    public void updateExamenGenitoUrinaire(int jockeyId, ResultatExamenParaclinique resultatExamenParaclinique) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        resultatExamenParaclinique.setDossierMedicale(dossierMedicale);
        resultatExamenParaclinique.setEchocardiographie(encryptIfNotNull(resultatExamenParaclinique.getEchocardiographie()));
        resultatExamenParaclinique.setTensionArtériellALeffort(encryptIfNotNull(resultatExamenParaclinique.getTensionArtériellALeffort()));
        resultatExamenParaclinique.setTensionArterielleAuRepos(encryptIfNotNull(resultatExamenParaclinique.getTensionArterielleAuRepos()));
        resultatExamenParaclinique.setRadiographieDuRachisLombaire(encryptIfNotNull(resultatExamenParaclinique.getRadiographieDuRachisLombaire()));
        resultatExamenParaclinique.setRadiographieDuPoumon(encryptIfNotNull(resultatExamenParaclinique.getRadiographieDuPoumon()));
        resultatExamenParacliniqueRepo.save(resultatExamenParaclinique);
    }
}
