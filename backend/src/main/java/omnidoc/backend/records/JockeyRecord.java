package omnidoc.backend.records;


import omnidoc.backend.entity.enums.Role;
import omnidoc.backend.entity.enums.Status;
import omnidoc.backend.entity.enums.Ville;
import omnidoc.backend.request.JockeyModificationRequest;

import java.util.Date;

public record JockeyRecord(int id, String nom,

                           String prénom,

                           Character sexe,

                           Date dateNaissance,

                           String cinId,

                           Ville ville, String adresse,

                           String telephone,

                           String email,

                           String sorecId,


                           Role role, Status status, Float plisDroit,Float plisGauche,Float matieresGrasses) {

}