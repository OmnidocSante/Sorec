package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.dossier.Hygiene;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.repository.HygieneRepo;
import omnidoc.backend.util.AESUtil;
import org.springframework.stereotype.Service;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class HygieneService {
    private final HygieneRepo hygieneRepo;
    private final DossierMedicaleRepo dossierMedicaleRepo;

    public HygieneService(HygieneRepo hygieneRepo, DossierMedicaleRepo dossierMedicaleRepo) {
        this.hygieneRepo = hygieneRepo;
        this.dossierMedicaleRepo = dossierMedicaleRepo;
    }


    public Hygiene fetchHygieneByPatientId(int patientId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(patientId).orElseThrow(() -> new ApiException("not found"));
        Hygiene hygiene = dossierMedicale.getHygiene();

        hygiene.setAutres(decryptIfNotNull(hygiene.getAutres()));
        hygiene.setSommeil(decryptIfNotNull(hygiene.getSommeil()));
        hygiene.setAlcool(decryptIfNotNull(hygiene.getAlcool()));
        hygiene.setTabac(decryptIfNotNull(hygiene.getTabac()));
        hygiene.setAllergiesAlimentaire(decryptIfNotNull(hygiene.getAllergiesAlimentaire()));
        hygiene.setHabitudesAlimentaire(decryptIfNotNull(hygiene.getHabitudesAlimentaire()));

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
