package omnidoc.backend.entity.dossier;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.users.Jockey;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Hygiene {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "dossier_medicale_id",referencedColumnName = "id")
    private DossierMedicale dossierMedicale;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String habitudesAlimentaire;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String AllergiesAlimentaire;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String tabac;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String alcool;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String hydratation;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String sommeil;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String autres;


}
