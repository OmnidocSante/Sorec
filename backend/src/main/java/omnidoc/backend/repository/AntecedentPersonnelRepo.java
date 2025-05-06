package omnidoc.backend.repository;

import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.enums.SystemeMedical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface AntecedentPersonnelRepo extends JpaRepository<AntecedentPersonnel, Integer> {
    @Modifying
    @Query("UPDATE AntecedentPersonnel a SET a.hasCondition = :hasCondition, a.remarques = :remarques WHERE a.id = :id")
    void updateAntecedent(@Param("id") Integer id,
                          @Param("hasCondition") String hasCondition,
                          @Param("remarques") String remarques);

    List<AntecedentPersonnel> findAntecedentPersonnelsByCondition_Systeme_NomAndDossierMedicale(SystemeMedical conditionSystemeNom, DossierMedicale dossierMedicale);
}
