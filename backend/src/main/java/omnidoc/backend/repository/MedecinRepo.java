package omnidoc.backend.repository;



import omnidoc.backend.entity.users.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface MedecinRepo extends JpaRepository<Medecin, Integer> {

    @Transactional
    void deleteByUser_Id(int userId);

    Optional<Medecin> findByUser_Id(int userId);

    Optional<Medecin> findByUser_Email(String userEmail);


}
