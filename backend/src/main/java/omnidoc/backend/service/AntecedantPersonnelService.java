package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.AntecedentPersonnel;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.AntecedentPersonnelRepo;
import omnidoc.backend.repository.DossierMedicaleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static omnidoc.backend.util.AESUtil.decrypt;
import static omnidoc.backend.util.AESUtil.encrypt;

@Service
public class AntecedantPersonnelService {
    @Autowired
    private AntecedentPersonnelRepo antecedentPersonnelRepo;
    @Autowired
    private DossierMedicaleRepo dossierMedicalRepo;


    public void saveAntecedantPersonnel(AntecedentPersonnel request, int dossierId) throws Exception {
        DossierMedicale dossier = dossierMedicalRepo.findById(dossierId).orElseThrow(() -> new RuntimeException("Dossier not found with id: " + dossierId));

        AntecedentPersonnel existing = antecedentPersonnelRepo.findByDossierMedicale_Id(dossierId).orElse(null);

        if (existing != null) {
            existing.setAppareilTest(encrypt(request.getAppareilTest()));
            existing.setBloodTest(encrypt(request.getBloodTest()));
            antecedentPersonnelRepo.save(existing);
        } else {
            AntecedentPersonnel newAntecedent = new AntecedentPersonnel();
            newAntecedent.setAppareilTest(encrypt(request.getAppareilTest()));
            newAntecedent.setBloodTest(encrypt(request.getBloodTest()));
            newAntecedent.setDossierMedicale(dossier);
            antecedentPersonnelRepo.save(newAntecedent);
        }
    }


    public AntecedentPersonnel getAntecedantPersonnel(int dossierId) throws Exception {

        AntecedentPersonnel antecedentPersonnel = antecedentPersonnelRepo.findByDossierMedicale_Id(dossierId).orElseThrow(() -> new ApiException("not found"));
        return new AntecedentPersonnel(antecedentPersonnel.getId(), decrypt(antecedentPersonnel.getAppareilTest()), decrypt(antecedentPersonnel.getBloodTest()));

    }


}
