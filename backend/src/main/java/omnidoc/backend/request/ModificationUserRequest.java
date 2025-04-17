package omnidoc.backend.request;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import omnidoc.backend.entity.enums.Role;
import omnidoc.backend.entity.enums.Ville;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ModificationUserRequest {

    @Enumerated(EnumType.STRING)
    private Ville ville;

    @NotBlank(message = "adresse is required")
    private String adresse;
    @NotNull(message = "Sexe is required")
    private Character sexe;
    @NotNull(message = "Role is required")
    @Enumerated(EnumType.STRING)
    private Role role;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

}
