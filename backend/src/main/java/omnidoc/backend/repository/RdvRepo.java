package omnidoc.backend.repository;

import omnidoc.backend.entity.rdv.Rdv;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RdvRepo extends JpaRepository<Rdv, Integer> {

}
