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
public class ResultatExamenParaclinique {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "dossier_medicale_id", referencedColumnName = "id")
    private DossierMedicale dossierMedicale;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String echocardiographie;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String tensionArterielleAuRepos;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String tensionArtériellALeffort;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String radiographieDuRachisLombaire;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String radiographieDuPoumon;


}
