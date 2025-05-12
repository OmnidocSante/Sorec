package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.resultat.ResultatExamenParaclinique;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.ResultatExamenParacliniqueRepo;
import org.springframework.stereotype.Service;

import java.util.Set;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class ResultatExamenParacliniqueService {
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final ResultatExamenParacliniqueRepo resultatExamenParacliniqueRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    public ResultatExamenParacliniqueService(DossierMedicaleRepo dossierMedicaleRepo, ResultatExamenParacliniqueRepo resultatExamenParacliniqueRepo, FieldVisibilityService fieldVisibilityService, AccessService accessService) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.resultatExamenParacliniqueRepo = resultatExamenParacliniqueRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }

    public ResultatExamenParaclinique fetchResultatExamenParaclinique(int jockeyId) throws Exception {
        accessService
                .verifyAccess(jockeyId);

        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        return getResultatExamenParaclinique(dossierMedicale);
    }

    public ResultatExamenParaclinique fetchResultatExamenParacliniqueByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.findById(dossierId).orElseThrow(() -> new ApiException("not found"));
        return getResultatExamenParaclinique(dossierMedicale);
    }

    private ResultatExamenParaclinique getResultatExamenParaclinique(DossierMedicale dossierMedicale) throws Exception {
        ResultatExamenParaclinique resultatExamenParaclinique = dossierMedicale.getResultatExamenParaclinique();
        resultatExamenParaclinique.setDossierMedicale(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("resultat_examen_paraclinique");

        if (!hiddenFields.contains("echocardiographie"))
            resultatExamenParaclinique.setEchocardiographie(decryptIfNotNull(resultatExamenParaclinique.getEchocardiographie()));
        else
            resultatExamenParaclinique.setEchocardiographie("HIDDEN");

        if (!hiddenFields.contains("tension_artériellaleffort"))
            resultatExamenParaclinique.setTensionArtériellALeffort(decryptIfNotNull(resultatExamenParaclinique.getTensionArtériellALeffort()));
        else
            resultatExamenParaclinique.setTensionArtériellALeffort("HIDDEN");

        if (!hiddenFields.contains("tension_arterielle_au_repos"))
            resultatExamenParaclinique.setTensionArterielleAuRepos(decryptIfNotNull(resultatExamenParaclinique.getTensionArterielleAuRepos()));
        else
            resultatExamenParaclinique.setTensionArterielleAuRepos("HIDDEN");

        if (!hiddenFields.contains("radiographie_du_rachis_lombaire"))
            resultatExamenParaclinique.setRadiographieDuRachisLombaire(decryptIfNotNull(resultatExamenParaclinique.getRadiographieDuRachisLombaire()));
        else
            resultatExamenParaclinique.setRadiographieDuRachisLombaire("HIDDEN");

        if (!hiddenFields.contains("radiographie_du_poumon"))
            resultatExamenParaclinique.setRadiographieDuPoumon(decryptIfNotNull(resultatExamenParaclinique.getRadiographieDuPoumon()));
        else
            resultatExamenParaclinique.setRadiographieDuPoumon("HIDDEN");

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
