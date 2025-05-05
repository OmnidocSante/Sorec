package omnidoc.backend.entity.examens.electrocardiogrammes;


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
public class ElectrocardiogrammeEffort {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "dossier_medicale_id", referencedColumnName = "id")
    private DossierMedicale dossierMedicale;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String frequenceCardiaque;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String rythme;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String conduction;


    @Lob
    @Column(columnDefinition = "TEXT", name = "axe_QRS")
    private String axeQRS;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String repolarisation;


}
