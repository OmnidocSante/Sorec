package omnidoc.backend.repository;


import omnidoc.backend.entity.examens.ExamenOphtalmogique;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamenOphtalmogiqueRepo extends JpaRepository<ExamenOphtalmogique,Integer> {
}
