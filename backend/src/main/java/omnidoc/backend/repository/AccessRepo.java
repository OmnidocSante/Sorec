package omnidoc.backend.repository;

import omnidoc.backend.entity.users.Access;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccessRepo extends JpaRepository<Access, Long> {
    List<Access> findByMedecin(Medecin medecin);

    List<Access> findByJockey(Jockey jockey);

    boolean existsByMedecinAndJockey(Medecin medecin, Jockey jockey);
}
