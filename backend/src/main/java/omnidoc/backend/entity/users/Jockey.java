package omnidoc.backend.entity.users;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import omnidoc.backend.entity.enums.Status;

@Entity
@Table(name = "jockeys")
@Getter
@Setter
public class Jockey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Enumerated(EnumType.STRING)
    private Status status;


}
