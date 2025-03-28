package omnidoc.backend.entity.users;


import jakarta.persistence.*;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

}
