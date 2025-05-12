package omnidoc.backend.entity.dossier;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "field_visibility", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"tableName", "fieldName"})
})
public class FieldVisibility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tableName;
    private String fieldName;

    private boolean hidden;
}