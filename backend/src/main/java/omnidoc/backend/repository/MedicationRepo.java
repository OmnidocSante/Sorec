package omnidoc.backend.repository;

import omnidoc.backend.entity.dossier.Medication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicationRepo extends JpaRepository<Medication,Integer> {
    boolean existsByMedicamentAndDossierMedicale_Id(String medicament, int dossierMedicaleId);
}
