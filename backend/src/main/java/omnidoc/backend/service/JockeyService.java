package omnidoc.backend.service;

import omnidoc.backend.entity.enums.Role;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.records.UserRecord;
import omnidoc.backend.repository.JockeyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.net.http.HttpHeaders;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@Service
public class JockeyService {
    @Autowired
    private JockeyRepo jockeyRepo;
    @Autowired
    private UserService userService;

    public List<UserRecord> getJockeys() {
        List<UserRecord> userRecords = userService.getUsers();
        return userRecords.stream().filter(userRecord -> userRecord.role() == Role.JOCKEY).toList();
    }

    public List<Jockey> getJockey(){
        return jockeyRepo.findAll();
    }
//
//    public void addImage(MultipartFile image, int jockeyId) throws IOException, SQLException {
//        try {
//            Jockey jockey = jockeyRepo.findByUser_Id(jockeyId).orElseThrow(() -> new ApiException("User not found"));
//            byte[] imageBytes = image.getBytes();
//            Blob imageBlob = new SerialBlob(imageBytes);
//            jockey.setImage(imageBlob);
//            jockeyRepo.save(jockey);
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//            throw new ApiException("erreur lors de télechargement d'image");
//        }
//
//    }
//
//
//    public String detectContentType(byte[] imageBytes) throws IOException {
//        try (InputStream is = new ByteArrayInputStream(imageBytes)) {
//            return URLConnection.guessContentTypeFromStream(is);
//        }
//    }
//
//
//    public byte[] getJockeyImage(int userId) throws SQLException, IOException {
//        Jockey jockey = jockeyRepo.findByUser_Id(userId).orElseThrow(() -> new ApiException("User not found"));
//
//        Blob imageBlob = jockey.getImage();
//
//        if (imageBlob == null || imageBlob.length() == 0) {
//            throw new ApiException("No image found for this jockey");
//        }
//
//        return imageBlob.getBinaryStream().readAllBytes();
//    }


}
