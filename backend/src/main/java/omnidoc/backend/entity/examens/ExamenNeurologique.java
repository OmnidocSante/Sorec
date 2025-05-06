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
public class ExamenNeurologique {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "dossier_medicale_id",referencedColumnName = "id")
    private DossierMedicale dossierMedicale;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String reflexePupillaire;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String reflexesOstéoTendineux;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String coordination;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String equilibre;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String sensibilite;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String motricite;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String tonicite;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String autres;

}
