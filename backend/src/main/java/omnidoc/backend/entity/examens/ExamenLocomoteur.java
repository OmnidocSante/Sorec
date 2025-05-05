package omnidoc.backend.entity.examens;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.examens.parametresExamens.ParametresExamenLocomoteur;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamenLocomoteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "dossier_medicale_id",referencedColumnName = "id")
    private DossierMedicale dossierMedicale;

    @OneToMany(mappedBy = "examenLocomoteur")
    private List<ParametresExamenLocomoteur> parametresExamenLocomoteurs;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String forceHanche;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String forceGenoux;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String forceCheville;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String souplesseMusculaire;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String forceTendons;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String forceEpaule;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String forceCoude;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String forcePoignet;



}
