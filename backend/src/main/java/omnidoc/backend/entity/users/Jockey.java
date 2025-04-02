package omnidoc.backend.entity.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.enums.Status;

@Entity
@Table(name = "jockeys")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Jockey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Enumerated(EnumType.STRING)
    private Status status;

    public Jockey(User user, Status status) {
        this.user = user;
        this.status = status;
    }

    public Jockey(User user) {
        this.user = user;
    }
}
