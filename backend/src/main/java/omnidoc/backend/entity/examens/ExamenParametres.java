package omnidoc.backend.entity.examens;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "parametres_examen")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExamenParametres {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;
    private Boolean hasCondition;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String remarques;
}
