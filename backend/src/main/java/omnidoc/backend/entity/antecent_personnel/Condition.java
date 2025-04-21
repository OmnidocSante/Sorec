package omnidoc.backend.entity.antecent_personnel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.enums.ConditionAntecedant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "conditions")
@Entity
public class Condition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private ConditionAntecedant nom;

    @ManyToOne
    @JoinColumn(name = "systeme_id", referencedColumnName = "id")
    private Systeme systeme;
}
