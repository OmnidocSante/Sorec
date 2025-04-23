package omnidoc.backend.entity.antecent_personnel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.dossier.DossierMedicale;
import org.hibernate.annotations.BatchSize;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@BatchSize(size = 52)
@Table(
        name = "antécédents_personnels",
        indexes = {
                @Index(name = "idx_condition_id", columnList = "condition_id"),
                @Index(name = "idx_dossier_medicale_id", columnList = "dossier_medicale_id"),
                @Index(name = "idx_has_condition", columnList = "hasCondition")
        }
)
public class AntecedentPersonnel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "condition_id", referencedColumnName = "id")
    private Condition condition;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "dossier_medicale_id", referencedColumnName = "id")
    private DossierMedicale dossierMedicale;

    private boolean hasCondition;

    @Lob
    @Column(columnDefinition = "TEXT", nullable = false)
    private String remarques;


}
