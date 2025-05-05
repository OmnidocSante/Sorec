package omnidoc.backend.entity.resultat;


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
public class Conclusion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "dossier_medicale_id", referencedColumnName = "id")
    private DossierMedicale dossierMedicale;

    @Lob
    @Column(columnDefinition = "TEXT", name = "cardio-vasculaire")
    private String cardioVasculaire;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String pleuropulmonaire;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String ophtalmique;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String auditif;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String neurologique;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String abdominal;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String urogénital;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String paraclinique;


}
