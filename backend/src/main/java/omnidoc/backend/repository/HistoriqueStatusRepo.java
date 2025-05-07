package omnidoc.backend.repository;


import omnidoc.backend.entity.dossier.HistoriqueStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoriqueStatusRepo extends JpaRepository<HistoriqueStatus,Integer> {
    List<HistoriqueStatus> findHistoriqueStatusesByJockey_Id(Integer jockeyId);
}
