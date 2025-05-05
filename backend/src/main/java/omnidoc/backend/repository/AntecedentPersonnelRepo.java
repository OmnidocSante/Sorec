package omnidoc.backend.repository;

import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface AntecedentPersonnelRepo extends JpaRepository<AntecedentPersonnel, Integer> {
    @Modifying
    @Query("UPDATE AntecedentPersonnel a SET a.hasCondition = :hasCondition, a.remarques = :remarques WHERE a.id = :id")
    void updateAntecedent(@Param("id") Integer id,
                          @Param("hasCondition") String hasCondition,
                          @Param("remarques") String remarques);

}
