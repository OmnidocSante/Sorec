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
@Table(name = "rdvs", uniqueConstraints = {@UniqueConstraint(name = "uc_medecin_time", columnNames = {"medecin_id", "date"}), @UniqueConstraint(name = "uc_jockey_time", columnNames = {"jockey_id", "date"})})
public class Rdv {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @NotNull(message = "La date du rendez-vous est obligatoire")
    @FutureOrPresent(message = "La date du rendez-vous doit être dans le présent ou le futur")
    @Column(nullable = false)
    public LocalDateTime date;

    @NotNull(message = "Le médecin est obligatoire")
    @OneToOne
    @JoinColumn(name = "medecin_id", referencedColumnName = "id", nullable = false)
    public Medecin medecin;

    @NotNull(message = "Le jockey est obligatoire")
    @OneToOne
    @JoinColumn(name = "jockey_id", referencedColumnName = "id", nullable = false)
    public Jockey jockey;

    @Enumerated(value = EnumType.STRING)
    public StatusRDV statusRDV = StatusRDV.PLANIFIE;
}
