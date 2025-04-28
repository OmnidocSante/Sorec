package omnidoc.backend.controller;

import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.User;
import omnidoc.backend.records.JockeyRecord;
import omnidoc.backend.records.UserRecord;
import omnidoc.backend.request.JockeyModificationRequest;
import omnidoc.backend.service.JockeyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLConnection;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/jockeys")
public class JockeyController {
    @Autowired
    private JockeyService jockeyService;

    @PreAuthorize("hasAnyAuthority('ADMIN','MEDECIN')")
    @GetMapping
    public ResponseEntity<List<UserRecord>> getJockeys() {
        return ResponseEntity.ok(jockeyService.getJockeys());
    }


    @PreAuthorize("hasAnyAuthority('ADMIN','MEDECIN')")
    @GetMapping("/{jockeyId}")
    public ResponseEntity<JockeyRecord> getJockey(@PathVariable int jockeyId) throws Exception {
        return ResponseEntity.ok(jockeyService.getJockey(jockeyId));
    }

    @PreAuthorize("hasAuthority('MEDECIN')")
    @PatchMapping("/{jockeyId}")
    public ResponseEntity<Void> changeJockey(@PathVariable int jockeyId,@RequestBody JockeyModificationRequest jockeyModificationRequest) throws Exception {
        jockeyService.changeJockey(jockeyId,jockeyModificationRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }




//    @PatchMapping("/{userId}")
//    public ResponseEntity<Void> updateImage(@RequestParam("image") MultipartFile image, @PathVariable int userId) throws SQLException, IOException {
//        jockeyService.addImage(image, userId);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @GetMapping("/{userId}/image")
//    public ResponseEntity<byte[]> viewImageJockey(@PathVariable int userId) throws SQLException, IOException {
//        byte[] imageBytes = jockeyService.getJockeyImage(userId);
//        String mimeType = URLConnection.guessContentTypeFromStream(new ByteArrayInputStream(imageBytes));
//        if (mimeType == null) mimeType = "application/octet-stream";
//        return ResponseEntity.ok().contentType(MediaType.parseMediaType(mimeType)).body(imageBytes);
//    }
//

}
