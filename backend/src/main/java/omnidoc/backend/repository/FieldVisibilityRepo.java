package omnidoc.backend.repository;


import omnidoc.backend.entity.dossier.FieldVisibility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FieldVisibilityRepo extends JpaRepository<FieldVisibility, Integer> {
    List<FieldVisibility> findByTableName(String tableName);

    Optional<FieldVisibility> findByTableNameAndFieldName(String tableName, String fieldName);
}
