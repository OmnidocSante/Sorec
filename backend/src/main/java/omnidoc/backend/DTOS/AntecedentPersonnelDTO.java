package omnidoc.backend.DTOS;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.antecent_personnel.Condition;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AntecedentPersonnelDTO {
    private Integer id;

    private Condition condition;

    private boolean hasCondition;

    private String remarques;

}
