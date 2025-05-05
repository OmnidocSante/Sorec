package omnidoc.backend.repository;

import omnidoc.backend.entity.examens.parametresExamens.ParametresExamenCardioVasculaire;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParametresRepo extends JpaRepository<ParametresExamenCardioVasculaire,Integer> {
}
