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
public class ExamenPleuroPulmonaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "dossier_medicale_id", referencedColumnName = "id")
    private DossierMedicale dossierMedicale;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String frequence_respiratoire;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String inspection;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String austucultation;


}
