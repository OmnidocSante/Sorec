package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.dossier.Hygiene;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.HygieneRepo;
import org.springframework.stereotype.Service;

import java.util.Set;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class HygieneService {
    private final HygieneRepo hygieneRepo;
    private final DossierMedicaleRepo dossierMedicaleRepo;
    private final FieldVisibilityService fieldVisibilityService;
    private final AccessService accessService;

    public HygieneService(HygieneRepo hygieneRepo, DossierMedicaleRepo dossierMedicaleRepo, FieldVisibilityService fieldVisibilityService, AccessService accessService) {
        this.hygieneRepo = hygieneRepo;
        this.dossierMedicaleRepo = dossierMedicaleRepo;
        this.fieldVisibilityService = fieldVisibilityService;
        this.accessService = accessService;
    }


    public Hygiene fetchHygieneByPatientId(int patientId) throws Exception {
        accessService.verifyAccess(patientId);

        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(patientId).orElseThrow(() -> new ApiException("not found"));
        return getHygiene(dossierMedicale);
    }

    public Hygiene fetchHygieneByDossierId(int dossierId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.findById(dossierId).orElseThrow(() -> new ApiException("not found"));
        return getHygiene(dossierMedicale);
    }

    private Hygiene getHygiene(DossierMedicale dossierMedicale) throws Exception {
        Hygiene hygiene = dossierMedicale.getHygiene();
        hygiene.setDossierMedicale(dossierMedicale);

        Set<String> hiddenFields = fieldVisibilityService.getHiddenFields("hygiene");

        if (!hiddenFields.contains("autres"))
            hygiene.setAutres(decryptIfNotNull(hygiene.getAutres()));
        else
            hygiene.setAutres("HIDDEN");

        if (!hiddenFields.contains("sommeil"))
            hygiene.setSommeil(decryptIfNotNull(hygiene.getSommeil()));
        else
            hygiene.setSommeil("HIDDEN");

        if (!hiddenFields.contains("alcool"))
            hygiene.setAlcool(decryptIfNotNull(hygiene.getAlcool()));
        else
            hygiene.setAlcool("HIDDEN");

        if (!hiddenFields.contains("tabac"))
            hygiene.setTabac(decryptIfNotNull(hygiene.getTabac()));
        else
            hygiene.setTabac("HIDDEN");

        if (!hiddenFields.contains("allergies_alimentaire"))
            hygiene.setAllergiesAlimentaire(decryptIfNotNull(hygiene.getAllergiesAlimentaire()));
        else
            hygiene.setAllergiesAlimentaire("HIDDEN");

        if (!hiddenFields.contains("habitudes_alimentaire"))
            hygiene.setHabitudesAlimentaire(decryptIfNotNull(hygiene.getHabitudesAlimentaire()));
        else
            hygiene.setHabitudesAlimentaire("HIDDEN");

        return hygiene;
    }



    public void modifyHygiene(int jockeyId, Hygiene hygiene) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("not found"));
        hygiene.setAutres(encryptIfNotNull(hygiene.getAutres()));
        hygiene.setSommeil(encryptIfNotNull(hygiene.getSommeil()));
        hygiene.setAlcool(encryptIfNotNull(hygiene.getAlcool()));
        hygiene.setTabac(encryptIfNotNull(hygiene.getTabac()));
        hygiene.setAllergiesAlimentaire(encryptIfNotNull(hygiene.getAllergiesAlimentaire()));
        hygiene.setHabitudesAlimentaire(encryptIfNotNull(hygiene.getHabitudesAlimentaire()));
        hygiene.setDossierMedicale(dossierMedicale);
        hygieneRepo.save(hygiene);
    }


}
