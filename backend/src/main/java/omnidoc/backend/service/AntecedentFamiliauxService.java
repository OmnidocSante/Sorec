package omnidoc.backend.service;

import omnidoc.backend.entity.antecedents_familiaux.AntecedentFamiliaux;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.AntecedentFamiliauxRepo;
import omnidoc.backend.repository.DossierMedicaleRepo;
import org.springframework.stereotype.Service;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class AntecedentFamiliauxService {

    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final AntecedentFamiliauxRepo antecedentFamiliauxRepo;

    public AntecedentFamiliauxService(DossierMedicaleRepo dossierMedicaleRepo, AntecedentFamiliauxRepo antecedentFamiliauxRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.antecedentFamiliauxRepo = antecedentFamiliauxRepo;
    }

    public AntecedentFamiliaux fetchAntecedentFamiliaux(int jockeyId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        AntecedentFamiliaux antecedentFamiliaux = dossierMedicale.getAntecedentFamiliaux();
        antecedentFamiliaux.setDossierMedicale(dossierMedicale);
        antecedentFamiliaux.setAsthme(decryptIfNotNull(antecedentFamiliaux.getAsthme()));
        antecedentFamiliaux.setMedicaux(decryptIfNotNull(antecedentFamiliaux.getMedicaux()));
        antecedentFamiliaux.setMortSubite(decryptIfNotNull(antecedentFamiliaux.getMortSubite()));
        antecedentFamiliaux.setMaladiesMetaboliques(decryptIfNotNull(antecedentFamiliaux.getMaladiesMetaboliques()));
        antecedentFamiliaux.setAutres(decryptIfNotNull(antecedentFamiliaux.getAutres()));
        return antecedentFamiliaux;
    }

    public void updateAntecedentFamiliaux(int jockeyId, AntecedentFamiliaux antecedentFamiliaux) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        antecedentFamiliaux.setDossierMedicale(dossierMedicale);
        antecedentFamiliaux.setAsthme(encryptIfNotNull(antecedentFamiliaux.getAsthme()));
        antecedentFamiliaux.setMedicaux(encryptIfNotNull(antecedentFamiliaux.getMedicaux()));
        antecedentFamiliaux.setMortSubite(encryptIfNotNull(antecedentFamiliaux.getMortSubite()));
        antecedentFamiliaux.setMaladiesMetaboliques(encryptIfNotNull(antecedentFamiliaux.getMaladiesMetaboliques()));
        antecedentFamiliaux.setAutres(encryptIfNotNull(antecedentFamiliaux.getAutres()));
        antecedentFamiliauxRepo.save(antecedentFamiliaux);
    }
}
