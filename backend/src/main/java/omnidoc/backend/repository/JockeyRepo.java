package omnidoc.backend.repository;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import omnidoc.backend.entity.users.Jockey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface JockeyRepo extends JpaRepository<Jockey, Integer> {


    @Modifying
    @Transactional
    @Query("DELETE FROM Jockey j WHERE j.user.id = :userId")
    void deleteByUser_Id(@Param("userId") int userId);

    Optional<Jockey> findByUser_Id(int userId);

    Jockey findByUser_Email(@NotBlank(message = "Email is required") @Email(message = "Invalid email format") String userEmail);
}
