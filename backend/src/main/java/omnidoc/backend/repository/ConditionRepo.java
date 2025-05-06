package omnidoc.backend.repository;

import omnidoc.backend.entity.antecent_personnel.Condition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConditionRepo extends JpaRepository<Condition,Integer> {
}
