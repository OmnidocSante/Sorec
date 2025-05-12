package omnidoc.backend.service;

import omnidoc.backend.entity.enums.Role;
import omnidoc.backend.records.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedecinService {
    @Autowired
    private UserService userService;

    public List<UserRecord> getMedecins() {
        return userService.getUsers().stream().filter(userRecord -> userRecord.role() == Role.MEDECIN).toList();
    }


}
