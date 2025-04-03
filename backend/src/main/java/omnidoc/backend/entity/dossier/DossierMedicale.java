package omnidoc.backend.entity.dossier;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.users.Jockey;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "dossiers_medicaux")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DossierMedicale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private Jockey jockey;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean isCurrent = true;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private Map<String, String> champsModifies = new HashMap<>();

    private String blood;


    public DossierMedicale(Jockey jockey, Map<String, String> champsModifies, String blood) {
        this.jockey = jockey;
        this.champsModifies = champsModifies;
        this.blood = blood;
    }

    public DossierMedicale(Jockey jockey, String blood) {
        this.jockey = jockey;
        this.blood = blood;
    }
}