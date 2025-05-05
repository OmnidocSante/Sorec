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
public class ExamenAbdominal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "dossier_medicale_id",referencedColumnName = "id")
    private DossierMedicale dossierMedicale;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String oropharynx;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String foie;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String rate;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String autres;

}
