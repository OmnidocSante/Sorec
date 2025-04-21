package omnidoc.backend.entity.antecent_personnel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.enums.SystemeMedical;

@Table(name = "systemes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Systeme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private SystemeMedical nom;

}
