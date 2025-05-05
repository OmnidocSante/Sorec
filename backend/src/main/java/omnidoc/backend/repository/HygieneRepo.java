package omnidoc.backend.repository;


import omnidoc.backend.entity.dossier.Hygiene;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HygieneRepo extends JpaRepository<Hygiene,Integer> {
}
