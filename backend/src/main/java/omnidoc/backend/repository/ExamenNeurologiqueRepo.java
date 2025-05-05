package omnidoc.backend.repository;

import omnidoc.backend.entity.examens.ExamenNeurologique;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamenNeurologiqueRepo extends JpaRepository<ExamenNeurologique, Integer> {
}
