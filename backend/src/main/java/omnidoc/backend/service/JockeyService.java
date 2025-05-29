package omnidoc.backend.service;

import omnidoc.backend.entity.enums.Role;
import omnidoc.backend.entity.enums.Status;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.User;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.records.JockeyRecord;
import omnidoc.backend.records.UserRecord;
import omnidoc.backend.repository.JockeyRepo;
import omnidoc.backend.repository.UserRepo;
import omnidoc.backend.request.JockeyModificationRequest;
import omnidoc.backend.util.AESUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class JockeyService {
    @Autowired
    private JockeyRepo jockeyRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private AccessService accessService;

    public List<UserRecord> getJockeys() {
        List<UserRecord> userRecords = userService.getUsers();
        return userRecords.stream().filter(userRecord -> userRecord.role() == Role.JOCKEY).toList();
    }

    public List<HashMap<String, Integer>> getAptes() {
        List<Jockey> jockeys = jockeyRepo.findAll();

        int apteCount = 0;
        int nonApteCount = 0;

        for (Jockey jockey : jockeys) {
            if (jockey.getStatus().equals(Status.APTE)) {
                apteCount++;
            } else {
                nonApteCount++;
            }
        }
        HashMap<String, Integer> result = new HashMap<>();
        result.put("APTE", apteCount);
        result.put("NON_APTE", nonApteCount);
        return List.of(result);
    }


    public JockeyRecord getJockey(int jockeyId) throws Exception {
        accessService.verifyAccess(jockeyId);

        Jockey jockey = jockeyRepo.findById(jockeyId).orElseThrow(() -> new ApiException("Not found"));
        User user = jockey.getUser();

        Float DecryptedPlisDroit = null;
        Float DecryptedPlisGauche = null;
        Float DecryptedMatieresGrasses = null;

        if (jockey.getMatieresGrasses() != null)
            DecryptedMatieresGrasses = Float.parseFloat(AESUtil.decrypt(jockey.getMatieresGrasses()));
        if (jockey.getPlisGauche() != null)
            DecryptedPlisGauche = Float.parseFloat(AESUtil.decrypt(jockey.getPlisGauche()));
        if (jockey.getPlisDroit() != null)
            DecryptedPlisDroit = Float.parseFloat(AESUtil.decrypt(jockey.getPlisDroit()));


        return new JockeyRecord(user.getId(), user.getNom(), user.getPrénom(), user.getSexe(), user.getDateNaissance(), user.getCinId(), user.getVille(), user.getAdresse(), user.getTelephone(), user.getEmail(), user.getSorecId(), user.getRole(), jockey.getStatus(), DecryptedPlisDroit, DecryptedPlisGauche, DecryptedMatieresGrasses);
    }


    public void changeJockey(int jockeyId, JockeyModificationRequest jockeyModificationRequest) throws Exception {
        Jockey jockey = jockeyRepo.findById(jockeyId).orElseThrow(() -> new ApiException("not found"));
        jockey.setMatieresGrasses(AESUtil.encrypt(String.valueOf(jockeyModificationRequest.getMatieresGrasses())));
        jockey.setPlisGauche(AESUtil.encrypt(String.valueOf(jockeyModificationRequest.getPlisGauche())));
        jockey.setPlisDroit(AESUtil.encrypt(String.valueOf(jockeyModificationRequest.getPlisDroit())));
        jockeyRepo.save(jockey);
    }

    public List<Jockey> getJockey() {
        return jockeyRepo.findAll();
    }

    public void changeStatusJockey(int jockeyId, Status status) {
        Jockey jockey = jockeyRepo.findById(jockeyId).orElseThrow(() -> new ApiException("jockey not found"));
        jockey.setStatus(status);
        jockeyRepo.save(jockey);
    }


    public void addImage(MultipartFile image, int jockeyId) throws IOException, SQLException {
        try {
            Jockey jockey = jockeyRepo.findById(jockeyId).orElseThrow(() -> new ApiException("User not found"));
            byte[] imageBytes = image.getBytes();
            Blob imageBlob = new SerialBlob(imageBytes);
            jockey.setImage(imageBlob);
            jockeyRepo.save(jockey);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ApiException("erreur lors de télechargement d'image");
        }

    }


    public String detectContentType(byte[] imageBytes) throws IOException {
        try (InputStream is = new ByteArrayInputStream(imageBytes)) {
            return URLConnection.guessContentTypeFromStream(is);
        }
    }


    public Optional<byte[]> getJockeyImage(int userId) throws SQLException, IOException {
        Jockey jockey = jockeyRepo.findById(userId).orElseThrow(() -> new ApiException("User not found"));

        Blob imageBlob = jockey.getImage();

        if (imageBlob == null || imageBlob.length() == 0) {
            return Optional.empty();
        } else {

            return Optional.of(imageBlob.getBinaryStream().readAllBytes());
        }
    }


}
