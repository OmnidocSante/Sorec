package omnidoc.backend.service;

import jakarta.persistence.EntityManager;
import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.entity.antecent_personnel.Condition;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.AntecedentPersonnelRepo;
import omnidoc.backend.repository.ConditionRepo;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.util.AESUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class DossierMedicaleService {
    @Autowired
    private DossierMedicaleRepo dossierMedicaleRepo;

    @Autowired
    private AntecedentPersonnelRepo antecedentPersonnelRepo;
    @Autowired
    private ConditionRepo conditionRepo;
    @Autowired
    private JockeyService jockeyService;

    public List<AntecedentPersonnel> getAntecedantPersonnelsByPatientId(int patientId) {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrent(patientId, true).orElseThrow(() -> new ApiException("Dossier not found"));

        List<AntecedentPersonnel> antecedents = dossierMedicale.getAntecedentPersonnels();

        for (AntecedentPersonnel ap : antecedents) {
            if (ap.getRemarques() != null) {
                try {
                    ap.setRemarques(AESUtil.decrypt(ap.getRemarques()));
                } catch (Exception e) {
                    throw new ApiException("Decryption failed: " + e.getMessage());
                }
            }

        }

        return antecedents;

    }


    @Transactional
    public void changeAntecedantPersonnelByPatientId(List<AntecedentPersonnel> antecedents) throws Exception {

        for (AntecedentPersonnel ap : antecedents) {
            System.out.println(ap.getRemarques());
            System.out.println(ap.isHasCondition());
            if (ap.getRemarques() != null) {
                String encryptedRemarques = AESUtil.encrypt(ap.getRemarques());
                System.out.println(encryptedRemarques);
                antecedentPersonnelRepo.updateAntecedent(ap.getId(), ap.isHasCondition(), encryptedRemarques);


            } else {
                antecedentPersonnelRepo.updateAntecedent(ap.getId(), ap.isHasCondition(), null);
            }


        }
    }


}
