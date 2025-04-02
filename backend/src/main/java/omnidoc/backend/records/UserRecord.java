package omnidoc.backend.records;

import jakarta.validation.constraints.*;
import omnidoc.backend.entity.enums.Role;

import java.util.Date;

public record UserRecord(int id, String nom,

                         String prénom,

                         Character sexe,

                         Date dateNaissance,

                         String cinId,

                         String adresse,

                         Integer telephone,

                         String email,

                         String sorecId,


                         Role role) {

}