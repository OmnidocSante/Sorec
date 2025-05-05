package omnidoc.backend.entity.examens.parametresExamens;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.enums.ParametresExamenCardioVasculaireE;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParametresCardioVasculaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public  int id;

    @Enumerated(EnumType.STRING)
    private ParametresExamenCardioVasculaireE nom;
}
