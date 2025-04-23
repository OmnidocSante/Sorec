package omnidoc.backend.entity.dossier;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.entity.users.Jockey;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "dossiers_medicaux")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DossierMedicale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private Jockey jockey;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime date;

    @Column(nullable = false)
    private Boolean isCurrent = true;

    @OneToMany(mappedBy = "dossierMedicale")
    private List<AntecedentPersonnel> antecedentPersonnels;

}