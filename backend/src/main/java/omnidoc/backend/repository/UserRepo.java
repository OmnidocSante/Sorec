package omnidoc.backend.repository;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import omnidoc.backend.entity.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findByPasswordCreationToken(String passwordCreationToken);
    Optional<User> findByPasswordResetToken(String passwordResetToken);

    Boolean existsByEmail(String email);

    Boolean existsByCinId(String cinId);

    Boolean existsBySorecId(String sorecId);

    Boolean existsByTelephone(@NotNull(message = "Phone number is required") String telephone);

    Boolean existsByNomAndPrénom(@NotBlank(message = "Nom is required") String nom, @NotBlank(message = "Prénom is required") String prénom);
    
}
