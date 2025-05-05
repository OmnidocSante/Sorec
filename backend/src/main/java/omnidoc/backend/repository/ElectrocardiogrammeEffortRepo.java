package omnidoc.backend.repository;

import omnidoc.backend.entity.examens.electrocardiogrammes.ElectrocardiogrammeEffort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElectrocardiogrammeEffortRepo extends JpaRepository<ElectrocardiogrammeEffort,Integer> {
}
