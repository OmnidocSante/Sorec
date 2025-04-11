package omnidoc.backend.repository;

import omnidoc.backend.entity.dossier.AntecedentPersonnel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AntecedentPersonnelRepo extends JpaRepository<AntecedentPersonnel, Integer> {
    Optional<AntecedentPersonnel> findByDossierMedicale_Id(int dossierMedicaleId);
}
