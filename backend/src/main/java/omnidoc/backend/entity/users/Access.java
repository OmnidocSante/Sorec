package omnidoc.backend.entity.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "access")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Access {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "medecin_id")
    private Medecin medecin;


    @ManyToOne
    @JoinColumn(name = "jockey_id")
    private Jockey jockey;
}
