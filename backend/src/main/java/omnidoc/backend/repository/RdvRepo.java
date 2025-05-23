package omnidoc.backend.repository;

import jakarta.validation.constraints.NotNull;
import omnidoc.backend.entity.enums.StatusRDV;
import omnidoc.backend.entity.rdv.Rdv;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RdvRepo extends JpaRepository<Rdv, Integer> {
    List<Rdv> findRdvsByMedecin(Medecin medecin);

    @Query("SELECT r FROM Rdv r WHERE r.statusRDV <> :excludedStatus AND r.date BETWEEN :now AND :soon")
    List<Rdv> findUpcomingValidRdv(
            @Param("now") LocalDateTime now,
            @Param("soon") LocalDateTime soon,
            @Param("excludedStatus") StatusRDV excludedStatus
    );

}
