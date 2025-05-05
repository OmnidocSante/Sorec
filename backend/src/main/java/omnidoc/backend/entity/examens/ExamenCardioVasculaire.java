package omnidoc.backend.entity.examens;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.parametresExamens.ParametresExamenCardioVasculaire;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamenCardioVasculaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "dossier_id", referencedColumnName = "id")
    private DossierMedicale dossierMedicale;

    @OneToMany(mappedBy = "examenCardioVasculaire")
    private List<ParametresExamenCardioVasculaire> parametresExamenCardioVasculaires;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String frequenceCouche;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String frequenceDebout;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String frequenceObservation;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String tensionCouche;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String tensionDebout;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String tensionObservation;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String ausculationCouche;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String ausculationDebout;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String ausculationObservation;


}
