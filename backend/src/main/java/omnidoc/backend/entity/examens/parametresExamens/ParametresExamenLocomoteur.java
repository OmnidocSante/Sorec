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
public class ParametresExamenLocomoteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @ManyToOne
    @JoinColumn(name = "parametre_id", referencedColumnName = "id")
    private ParametresLocomoteur parametre;

    @ManyToOne
    @JoinColumn(name = "examen_locomoteur_id",referencedColumnName = "id")
    @JsonIgnore
    private ExamenLocomoteur examenLocomoteur;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String observations;


    @Lob
    @Column(columnDefinition = "TEXT")
    private String hasCondition;
    
}
