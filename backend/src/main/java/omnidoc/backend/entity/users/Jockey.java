package omnidoc.backend.entity.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import omnidoc.backend.entity.enums.Status;

import java.sql.Blob;
import java.util.List;

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


    @JsonIgnore
    @Lob
    private Blob image;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String plisDroit;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String plisGauche;

    @OneToMany(mappedBy = "jockey", cascade = CascadeType.ALL)
    private List<Access> accessList;



    @Lob
    @Column(columnDefinition = "TEXT")
    private String matieresGrasses;

    public Jockey(User user) {
        this.user = user;
    }
}
