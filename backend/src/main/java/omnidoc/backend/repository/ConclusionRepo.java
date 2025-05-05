package omnidoc.backend.repository;

import omnidoc.backend.entity.resultat.Conclusion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConclusionRepo extends JpaRepository<Conclusion,Integer> {
}
