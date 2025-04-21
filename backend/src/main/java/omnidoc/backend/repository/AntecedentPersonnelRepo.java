package omnidoc.backend.repository;

import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AntecedentPersonnelRepo extends JpaRepository<AntecedentPersonnel, Integer> {
}
