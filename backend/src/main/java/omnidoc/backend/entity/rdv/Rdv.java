package omnidoc.backend.entity.rdv;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.enums.StatusRDV;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.Medecin;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "rdvs")
public class Rdv {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @NotNull(message = "La date du rendez-vous est obligatoire")
    @Column(nullable = false)
    public LocalDateTime date;

    @NotNull(message = "Le médecin est obligatoire")
    @ManyToOne
    @JoinColumn(name = "medecin_id", referencedColumnName = "id", nullable = false)
    public Medecin medecin;

    @NotNull(message = "Le jockey est obligatoire")
    @ManyToOne
    @JoinColumn(name = "jockey_id", referencedColumnName = "id", nullable = false)
    public Jockey jockey;

    @Enumerated(value = EnumType.STRING)
    public StatusRDV statusRDV = StatusRDV.PLANIFIE;
}
