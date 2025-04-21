package omnidoc.backend.entity.antecent_personnel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.dossier.DossierMedicale;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "antécédents_personnels")
@Getter
@Setter
public class AntecedentPersonnel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "condition_id", referencedColumnName = "id")
    private Condition condition;

    @ManyToOne
    @JoinColumn(name = "dossier_medicale_id", referencedColumnName = "id")
    private DossierMedicale dossierMedicale;

    private boolean hasCondition;

    @Lob
    @Column(columnDefinition = "TEXT", nullable = false)
    private String remarques;

}
