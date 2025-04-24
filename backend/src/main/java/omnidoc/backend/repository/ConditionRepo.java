package omnidoc.backend.repository;

import omnidoc.backend.entity.antecent_personnel.Condition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConditionRepo extends JpaRepository<Condition,Integer> {
}
