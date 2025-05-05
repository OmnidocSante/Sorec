package omnidoc.backend.entity.examens;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.dossier.DossierMedicale;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamenAuditif {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "dossier_medicale_id", referencedColumnName = "id")
    private DossierMedicale dossierMedicale;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String conduitAuditifEtMembranesTympaniqueNormales;

    @Lob
    @Column(columnDefinition = "TEXT",name = "acuite_auditive_a_distance_og")
    private String acuiteAuditiveADistanceOg;

    @Lob
    @Column(columnDefinition = "TEXT",name = "acuite_auditive_a_distance_od")
    private String acuiteAuditiveADistanceOd;


}
