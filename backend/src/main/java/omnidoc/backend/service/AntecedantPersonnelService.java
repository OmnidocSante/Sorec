package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.AntecedentPersonnel;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.AntecedentPersonnelRepo;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.util.AESUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AntecedantPersonnelService {
    @Autowired
    public AntecedentPersonnelRepo antecedentPersonnelRepo;
    @Autowired
    private DossierMedicaleRepo dossierMedicalRepo;

    @Autowired
    private AESUtil aesUtil;

    public void saveAntecedantPersonnel(AntecedentPersonnel antecedentPersonnelRequest, int dossierId) throws Exception {
        AntecedentPersonnel antecedentPersonnel = new AntecedentPersonnel();

        antecedentPersonnel.setAppareilTest(aesUtil.encrypt(antecedentPersonnelRequest.getAppareilTest()));
        antecedentPersonnel.setBloodTest(aesUtil.encrypt(antecedentPersonnelRequest.getBloodTest()));

        DossierMedicale dossier = dossierMedicalRepo.findById(dossierId).orElseThrow(() -> new RuntimeException("Dossier not found with id: " + dossierId));

        antecedentPersonnel.setDossierMedicale(dossier);

        antecedentPersonnelRepo.save(antecedentPersonnel);
    }

    public AntecedentPersonnel getAntecedantPersonnel(int dossierId) throws Exception {
        AntecedentPersonnel antecedentPersonnel = antecedentPersonnelRepo.findByDossierMedicale_Id(dossierId).orElseThrow(() -> new ApiException("not found"));
        return new AntecedentPersonnel(antecedentPersonnel.getId(), aesUtil.decrypt(antecedentPersonnel.getAppareilTest()), aesUtil.decrypt(antecedentPersonnel.getBloodTest()));
    }


}
