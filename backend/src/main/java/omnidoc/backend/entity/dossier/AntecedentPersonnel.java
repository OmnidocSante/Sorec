package omnidoc.backend.entity.dossier;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "antécédents_personnels")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class AntecedentPersonnel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    public String appareilTest;

    public String bloodTest;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private Map<String, String> test = new HashMap<>();

    @OneToOne
    @JoinColumn(name = "dossier_id", referencedColumnName = "id")
    public DossierMedicale dossierMedicale;

    public AntecedentPersonnel(int id,String appareilTest,String bloodTest){
        this.id=id;
        this.appareilTest=appareilTest;
        this.bloodTest=bloodTest;
    }


}
