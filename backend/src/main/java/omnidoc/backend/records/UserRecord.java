package omnidoc.backend.records;

import omnidoc.backend.entity.enums.Role;
import omnidoc.backend.entity.enums.Ville;

import java.util.Date;

public record UserRecord(int id, String nom,

                         String prénom,

                         Character sexe,

                         Date dateNaissance,

                         String cinId,

                         Ville ville,
                         String adresse,

                         String telephone,

                         String email,

                         String sorecId,


                         Role role) {

}