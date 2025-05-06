package omnidoc.backend.entity.dossier;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.users.Medecin;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Medication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String medicament;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String dose;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String causeDuTraitement;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", name = "medecin_id")
    private Medecin medecin;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "dossier_medicale_id", referencedColumnName = "id")
    private DossierMedicale dossierMedicale;


}
