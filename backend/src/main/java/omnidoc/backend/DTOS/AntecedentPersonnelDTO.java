package omnidoc.backend.DTOS;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AntecedentPersonnelDTO {
    private Integer id;

    private String name;

    private boolean hasCondition;

    private String remarques;

}
