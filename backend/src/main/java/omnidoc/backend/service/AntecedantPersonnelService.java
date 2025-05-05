package omnidoc.backend.service;

import omnidoc.backend.DTOS.AntecedentPersonnelDTO;
import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.AntecedentPersonnelRepo;
import omnidoc.backend.repository.DossierMedicaleRepo;
import omnidoc.backend.util.AESUtil;
import omnidoc.backend.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AntecedantPersonnelService {
    @Autowired
    private AntecedentPersonnelRepo antecedentPersonnelRepo;

    @Autowired
    private DossierMedicaleRepo dossierMedicaleRepo;

    public List<AntecedentPersonnelDTO> getAntecedantPersonnelsByPatientId(int patientId) throws Exception {
        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(patientId).orElseThrow(() -> new ApiException("Dossier not found"));
        List<AntecedentPersonnel> antecedents = dossierMedicale.getAntecedentPersonnels();
        List<AntecedentPersonnelDTO> dtoList = new ArrayList<>();

        for (AntecedentPersonnel ap : antecedents) {
            AntecedentPersonnelDTO dto = new AntecedentPersonnelDTO();
            dto.setId(ap.getId());
            dto.setCondition(ap.getCondition());
            if (ap.getHasCondition() != null) {
                dto.setHasCondition(Util.parseStringToBoolean(ap.getHasCondition()));
            }

            if (ap.getRemarques() != null) {
                try {
                    dto.setRemarques(AESUtil.decrypt(ap.getRemarques()));
                } catch (Exception e) {
                    throw new ApiException("Decryption failed: " + e.getMessage());
                }
            }

            dtoList.add(dto);
        }

        return dtoList;

    }


    @Transactional
    public void changeAntecedantPersonnelByPatientId(List<AntecedentPersonnel> antecedents) throws Exception {
        for (AntecedentPersonnel ap : antecedents) {
            if (ap.getHasCondition() != null) {
                String encryptedCondition = Util.parseBooleanString(Boolean.valueOf(ap.getHasCondition()));
                ap.setHasCondition(encryptedCondition);
            }

            String encryptedRemarques = ap.getRemarques() != null ? AESUtil.encrypt(ap.getRemarques()) : null;

            antecedentPersonnelRepo.updateAntecedent(ap.getId(), ap.getHasCondition(), encryptedRemarques);
        }
    }




}
