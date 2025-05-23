package omnidoc.backend.repository;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import omnidoc.backend.entity.users.Jockey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface JockeyRepo extends JpaRepository<Jockey, Integer> {
    @Transactional
    void deleteByUser_Id(int userId);

    Optional<Jockey> findByUser_Id(int userId);

    Jockey findByUser_Email(@NotBlank(message = "Email is required") @Email(message = "Invalid email format") String userEmail);
}
