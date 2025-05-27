package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.dossier.Medication;
import omnidoc.backend.entity.users.Medecin;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static omnidoc.backend.util.Util.decryptIfNotNull;
import static omnidoc.backend.util.Util.encryptIfNotNull;

@Service
public class MedicationService {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private MedecinRepo medecinRepo;
    @Autowired
    private MedicationRepo medicationRepo;
    @Autowired
    private DossierMedicaleRepo dossierMedicaleRepo;
    @Autowired
    private AccessService accessService;

    public List<Medication> fetchMedicationByPatientId(int jockeyId) throws Exception {
        accessService.verifyAccess(jockeyId);


        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("Dossier médical non trouvé"));

        return getMedications(dossierMedicale);
    }

    public List<Medication> fetchMedicationByDossierId(int dossierId) throws Exception {

        DossierMedicale dossierMedicale = dossierMedicaleRepo.findById(dossierId).orElseThrow(() -> new ApiException("Dossier médical non trouvé"));

        return getMedications(dossierMedicale);
    }

    private List<Medication> getMedications(DossierMedicale dossierMedicale) throws Exception {
        List<Medication> medications = dossierMedicale.getMedications();
        System.out.println(medications);

        for (Medication medication : medications) {
            medication.setMedicament(decryptIfNotNull(medication.getMedicament()));
            medication.setDose(decryptIfNotNull(medication.getDose()));
            medication.setCauseDuTraitement(decryptIfNotNull(medication.getCauseDuTraitement()));
        }

        return medications;
    }



    public void addMedication(int jockeyId, List<Medication> medications, String jwt) throws Exception {
        String token = jwt.substring(7);
        System.out.println(token);
        String username = jwtService.extractUsername(token);
        System.out.println(username);

        DossierMedicale dossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockeyId).orElseThrow(() -> new ApiException("Dossier médical non trouvé"));

        Medecin medecin = medecinRepo.findByUser_Email(username).orElseThrow(() -> new ApiException("Médecin non trouvé"));

        for (Medication med : medications) {
            if (med.getDose() == null || med.getMedicament() == null) {
                throw new ApiException("Le médicament ou la dose est null");
            }
        }

        for (Medication medication : medications) {
            medication.setDose(encryptIfNotNull(medication.getDose()));
            medication.setMedicament(encryptIfNotNull(medication.getMedicament()));
            medication.setCauseDuTraitement(encryptIfNotNull(medication.getCauseDuTraitement()));
            medication.setMedecin(medecin);
            medication.setDossierMedicale(dossierMedicale);
        }

        medicationRepo.saveAll(medications);
    }



    public void deleteMedication(int medicationId) {
        medicationRepo.deleteById(medicationId);
    }

}
