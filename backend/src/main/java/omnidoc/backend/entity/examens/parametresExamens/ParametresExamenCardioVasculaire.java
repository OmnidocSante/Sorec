package omnidoc.backend.entity.examens.parametresExamens;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.examens.ExamenCardioVasculaire;
import omnidoc.backend.entity.examens.ExamenLocomoteur;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParametresExamenCardioVasculaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @ManyToOne
    @JoinColumn(name = "parametre_id", referencedColumnName = "id")
    private ParametresCardioVasculaire parametresCardioVasculaire;

    @ManyToOne
    @JoinColumn(name = "examen_cardio_id", referencedColumnName = "id")
    @JsonIgnore
    private ExamenCardioVasculaire examenCardioVasculaire;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String observations;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String hasCondition;

}
