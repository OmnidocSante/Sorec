package omnidoc.backend.entity.dossier;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.antecedents_familiaux.AntecedentFamiliaux;
import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.entity.examens.*;
import omnidoc.backend.entity.examens.electrocardiogrammes.ElectrocardiogrammeEffort;
import omnidoc.backend.entity.examens.electrocardiogrammes.ElectrocardiogrammeRepos;
import omnidoc.backend.entity.resultat.Conclusion;
import omnidoc.backend.entity.resultat.ResultatExamenParaclinique;
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
    private Boolean isCurrent;

    @JsonIgnore
    @OneToMany(mappedBy = "dossierMedicale")
    private List<AntecedentPersonnel> antecedentPersonnels;

    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private ExamenCardioVasculaire examenCardioVasculaire;

    @JsonIgnore
    @OneToMany(mappedBy = "dossierMedicale")
    private List<Medication> medications;

    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private Hygiene hygiene;

    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private ExamenPleuroPulmonaire examenPleuroPulmonaire;

    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private ExamenOphtalmogique examenOphtalmogique;

    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private ExamenAuditif examenAuditif;
    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private ExamenLocomoteur examenLocomoteur;
    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private ExamenNeurologique examenNeurologique;
    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private ExamenAbdominal examenAbdominal;
    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private ExamenGenitoUrinaire examenGenitoUrinaire;
    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private ElectrocardiogrammeRepos electrocardiogrammeRepos;
    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private ElectrocardiogrammeEffort electrocardiogrammeEffort;
    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private ResultatExamenParaclinique resultatExamenParaclinique;
    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private Conclusion conclusion;

    @JsonIgnore
    @OneToOne(mappedBy = "dossierMedicale")
    private AntecedentFamiliaux antecedentFamiliaux;


}