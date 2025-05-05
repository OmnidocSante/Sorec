package omnidoc.backend.entity.examens.parametresExamens;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.enums.ParametresExamenCardioVasculaireE;
import omnidoc.backend.entity.enums.ParametresExamenLocomoteurE;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParametresLocomoteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public  int id;

    @Enumerated(EnumType.STRING)
    private ParametresExamenLocomoteurE nom;
}
