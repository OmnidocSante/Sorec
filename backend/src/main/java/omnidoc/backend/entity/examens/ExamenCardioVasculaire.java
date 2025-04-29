package omnidoc.backend.entity.examens;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.dossier.DossierMedicale;

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

    @OneToOne
    @JoinColumn(name = "dossier_id", referencedColumnName = "id")
    @JsonIgnore
    private DossierMedicale dossierMedicale;

    @OneToMany
    @JoinColumn(name = "parametre_id", referencedColumnName = "id")
    private List<ParametresExamen> parametresExamen;

    private int frequenceCouche;
    private int frequenceDebout;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String frequenceObservation;

    private int tensionCouche;
    private int tensionDebout;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String tensionObservation;

    private int ausculationCouche;
    private int ausculationDebout;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String ausculationObservation;


}
