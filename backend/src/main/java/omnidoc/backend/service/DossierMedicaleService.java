package omnidoc.backend.service;

import jakarta.persistence.EntityManager;
import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.entity.antecent_personnel.Condition;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.AntecedentPersonnelRepo;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.util.AESUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DossierMedicaleService {
    @Autowired
    private DossierMedicaleRepo dossierMedicaleRepo;

    @Autowired
    private AntecedentPersonnelRepo antecedentPersonnelRepo;

    @Autowired
    private EntityManager entityManager;

    public List<AntecedentPersonnel> getAntecedantPersonnelsByPatientId(int patientId) {
        List<AntecedentPersonnel> antecedents = dossierMedicaleRepo
                .getDossierMedicaleByJockey_IdAndIsCurrent(8, true)
                .orElseThrow()
                .getAntecedentPersonnels();


        for (AntecedentPersonnel ap : antecedents) {
            try {
                ap.setRemarques(AESUtil.decrypt(ap.getRemarques()));
            } catch (Exception e) {
                throw new ApiException(e.getMessage());
            }
        }

        return antecedents;
    }
    @Transactional
    public void changeAntecedantPersonnelByPatientId(int patientId, List<AntecedentPersonnel> antecedents) {
        for (AntecedentPersonnel ap : antecedents) {
            try {
                String encryptedRemarques = AESUtil.encrypt(ap.getRemarques());

                antecedentPersonnelRepo.updateAntecedent(ap.getId(),
                        ap.isHasCondition(),
                        encryptedRemarques);
            } catch (Exception e) {
                throw new ApiException(e.getMessage());
            }
        }
    }


}
