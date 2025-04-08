package omnidoc.backend.repository;

import jakarta.validation.constraints.NotNull;
import omnidoc.backend.entity.rdv.Rdv;
import omnidoc.backend.entity.users.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RdvRepo extends JpaRepository<Rdv, Integer> {
    List<Rdv> findRdvsByMedecin(Medecin medecin);
}
