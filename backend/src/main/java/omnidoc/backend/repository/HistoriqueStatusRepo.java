package omnidoc.backend.repository;


import omnidoc.backend.entity.dossier.HistoriqueStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HistoriqueStatusRepo extends JpaRepository<HistoriqueStatus,Integer> {
    List<HistoriqueStatus> findHistoriqueStatusesByJockey_User_Id(Integer jockeyId);

    Optional<HistoriqueStatus> findTopByStatusAndMedecin_UserEmailOrderByDateDesc(String status, String userEmail);

    Optional<HistoriqueStatus> findTopByOrderByDateDesc();

}
