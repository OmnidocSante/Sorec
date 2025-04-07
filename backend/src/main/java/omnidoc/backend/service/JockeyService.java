package omnidoc.backend.service;

import omnidoc.backend.entity.enums.Role;
import omnidoc.backend.records.UserRecord;
import omnidoc.backend.repository.JockeyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JockeyService {
    @Autowired
    public JockeyRepo jockeyRepo;
    @Autowired
    public UserService userService;

    public List<UserRecord> getJockeys() {
        List<UserRecord> userRecords = userService.getUsers();
        return userRecords.stream().filter(userRecord -> userRecord.role() == Role.JOCKEY).toList();
    }


}
