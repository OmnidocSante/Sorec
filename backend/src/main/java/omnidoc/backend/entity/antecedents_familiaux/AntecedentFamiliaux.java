package omnidoc.backend.entity.antecedents_familiaux;


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
public class AntecedentFamiliaux {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "dossier_medicale_id", referencedColumnName = "id")
    private DossierMedicale dossierMedicale;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String medicaux;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String asthme;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String mortSubite;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String maladiesMetaboliques;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String autres;


}
