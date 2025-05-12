package omnidoc.backend.service;

import omnidoc.backend.entity.antecedents_familiaux.AntecedentFamiliaux;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.ExamenAbdominal;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.AntecedentFamiliauxRepo;
import omnidoc.backend.repository.DossierMedicaleRepo;
import org.springframework.stereotype.Service;

import java.util.Set;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class AntecedentFamiliauxService {

    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final AntecedentFamiliauxRepo antecedentFamiliauxRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    private static final String HIDDEN_MARKER = "HIDDEN";

    public AntecedentFamiliauxService(DossierMedicaleRepo dossierMedicaleRepo, AntecedentFamiliauxRepo antecedentFamiliauxRepo, FieldVisibilityService fieldVisibilityService, AccessService accessService) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.antecedentFamiliauxRepo = antecedentFamiliauxRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }

    public AntecedentFamiliaux fetchAntecedentFamiliaux(int jockeyId) throws Exception {
        accessService
                .verifyAccess(jockeyId);
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        return getAntecedentFamiliaux(dossierMedicale);
    }
    public AntecedentFamiliaux fetchAntecedentFamiliauxByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.findById(dossierId).orElseThrow(() -> new ApiException("not found"));
        return getAntecedentFamiliaux(dossierMedicale);
    }
    private AntecedentFamiliaux getAntecedentFamiliaux(DossierMedicale dossierMedicale) throws Exception {
        AntecedentFamiliaux antecedentFamiliaux = dossierMedicale.getAntecedentFamiliaux();
        antecedentFamiliaux.setDossierMedicale(dossierMedicale);
        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("antecedent_familiaux");

        if (!hiddenFields.contains("asthme"))
            antecedentFamiliaux.setAsthme(decryptIfNotNull(antecedentFamiliaux.getAsthme()));
        else
            antecedentFamiliaux.setAsthme("HIDDEN");

        if (!hiddenFields.contains("medicaux"))
            antecedentFamiliaux.setMedicaux(decryptIfNotNull(antecedentFamiliaux.getMedicaux()));
        else
            antecedentFamiliaux.setMedicaux("HIDDEN");

        if (!hiddenFields.contains("mort_subite"))
            antecedentFamiliaux.setMortSubite(decryptIfNotNull(antecedentFamiliaux.getMortSubite()));
        else
            antecedentFamiliaux.setMortSubite("HIDDEN");

        if (!hiddenFields.contains("maladies_metaboliques"))
            antecedentFamiliaux.setMaladiesMetaboliques(decryptIfNotNull(antecedentFamiliaux.getMaladiesMetaboliques()));
        else
            antecedentFamiliaux.setMaladiesMetaboliques("HIDDEN");

        if (!hiddenFields.contains("autres"))
            antecedentFamiliaux.setAutres(decryptIfNotNull(antecedentFamiliaux.getAutres()));
        else
            antecedentFamiliaux.setAutres("HIDDEN");

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
