package omnidoc.backend.repository;

import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.entity.dossier.DossierMedicale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface DossierMedicaleRepo extends JpaRepository<DossierMedicale, Integer> {
    @Transactional
    @Modifying
    @Query("UPDATE DossierMedicale d SET d.isCurrent = false WHERE d.jockey.id = :jockeyId")
    void deactivateOldVersions(@Param("jockeyId") int jockeyId);

    Optional<DossierMedicale> getDossierMedicaleByJockey_IdAndIsCurrent(Integer jockeyId, Boolean isCurrent);


}
