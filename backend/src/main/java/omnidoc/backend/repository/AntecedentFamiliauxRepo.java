package omnidoc.backend.repository;

import omnidoc.backend.entity.antecedents_familiaux.AntecedentFamiliaux;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AntecedentFamiliauxRepo extends JpaRepository<AntecedentFamiliaux,Integer> {
}
