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
@AllArgsConstructor
@NoArgsConstructor
public class ExamenGenitoUrinaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "dossier_medicale_id",referencedColumnName = "id")
    private DossierMedicale dossierMedicale;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String valeurGlucose;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String observationGlucose;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String valeurAlbumine;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String observationAlbumine;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String valeurSang;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String observationSang;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String valeurAutres;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String observationAutres;

}
