package omnidoc.backend.repository;



import omnidoc.backend.entity.users.Medecin;
import omnidoc.backend.entity.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface MedecinRepo extends JpaRepository<Medecin, Integer> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Medecin m WHERE m.user.id = :userId")
    void deleteByUser_Id(@Param("userId") int userId);

    Optional<Medecin> findByUser_Id(int userId);

    Optional<Medecin> findByUser_Email(String userEmail);


    String user(User user);
}
