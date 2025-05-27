package omnidoc.backend.entity.dossier;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.enums.Status;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.Medecin;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HistoriqueStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @CreationTimestamp
    @Column(name = "date", updatable = false)
    private LocalDateTime date;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "jockey_id")
    private Jockey jockey;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "medecin_id")
    private Medecin medecin;

    private String status;

    private String signature;

    @JsonIgnore
    @Lob
    private Blob certificate;

}
