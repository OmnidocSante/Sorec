package omnidoc.backend.entity.dossier;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.users.Jockey;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

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

    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private Jockey jockey;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime date;

    @Column(nullable = false)
    private Boolean isCurrent = true;
}