package omnidoc.backend.records;

import omnidoc.backend.entity.enums.Role;

import java.util.Date;

public record UserRecord(int id, String nom,

                         String prénom,

                         Character sexe,

                         Date dateNaissance,

                         String cinId,

                         String ville,
                         String adresse,

                         String telephone,

                         String email,

                         String sorecId,


                         Role role) {

}