package omnidoc.backend.repository;

import omnidoc.backend.entity.users.Jockey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JockeyRepo extends JpaRepository<Jockey, Integer> {
}
