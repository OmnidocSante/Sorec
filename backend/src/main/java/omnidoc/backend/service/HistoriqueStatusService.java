package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.HistoriqueStatus;
import omnidoc.backend.entity.enums.Status;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.Medecin;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.HistoriqueStatusRepo;
import omnidoc.backend.repository.JockeyRepo;
import omnidoc.backend.repository.MedecinRepo;
import omnidoc.backend.util.Util;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class HistoriqueStatusService {
    private final MedecinRepo medecinRepo;
    private final JwtService jwtService;
    private final JockeyRepo jockeyRepo;
    private final HistoriqueStatusRepo historiqueStatusRepo;

    public HistoriqueStatusService(JockeyRepo jockeyRepo, MedecinRepo medecinRepo, JwtService jwtService, HistoriqueStatusRepo historiqueStatusRepo) {
        this.medecinRepo = medecinRepo;
        this.jwtService = jwtService;
        this.jockeyRepo = jockeyRepo;
        this.historiqueStatusRepo = historiqueStatusRepo;
    }

    public void addStatus(Status status, int jockeyId, String jwt) throws Exception {
        String token = jwt.substring(7);
        String username = jwtService.extractUsername(token);
        Jockey jockey = jockeyRepo.findById(jockeyId).orElseThrow(() -> new ApiException("jockey not found"));
        Medecin medecin = medecinRepo.findByUser_Email(username).orElseThrow(() -> new ApiException("Doctor not found"));
        HistoriqueStatus historiqueStatus = new HistoriqueStatus();
        historiqueStatus.setJockey(jockey);
        historiqueStatus.setMedecin(medecin);
        historiqueStatus.setStatus(Util.encryptIfNotNull(status.name()));
        historiqueStatusRepo.save(historiqueStatus);

    }

    public List<HistoriqueStatusRecord> getStatus(int jockeyId) {
        List<HistoriqueStatus> historiqueStatuses = historiqueStatusRepo.findHistoriqueStatusesByJockey_User_Id(jockeyId);
        return historiqueStatuses.stream().map(historiqueStatus -> {
            try {
                return new HistoriqueStatusRecord(historiqueStatus.getMedecin().getUser().getNom(), historiqueStatus.getMedecin().getUser().getPrénom(), historiqueStatus.getJockey().getUser().getNom(), historiqueStatus.getJockey().getUser().getPrénom(), historiqueStatus.getDate(), Util.decryptIfNotNull(historiqueStatus.getStatus()));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).toList();
    }

    public record HistoriqueStatusRecord(String doctorName, String doctorLastName, String jockeyName,
                                         String jockeyLastName, LocalDateTime date, String status) {
    }

    public ResponseEntity<byte[]> addSignatureAndCertificate( String signature, MultipartFile certificateFile) throws Exception {

        HistoriqueStatus historiqueStatus = historiqueStatusRepo.findTopByOrderByDateDesc().orElseThrow(() -> new ApiException("Historique status not found"));
        if (historiqueStatus.getSignature() != null) {
            if (historiqueStatus.getCertificate() != null) {
                System.out.println("here");
                byte[] existingPdf = historiqueStatus.getCertificate().getBytes(1, (int) historiqueStatus.getCertificate().length());
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"certificate.pdf\"").body(existingPdf);
            } else {
                throw new ApiException("Signature exists but no certificate found");
            }
        }
        historiqueStatus.setSignature(signature);
        try {
            byte[] bytes = certificateFile.getBytes();
            Blob blob = new SerialBlob(bytes);
            historiqueStatus.setCertificate(blob);
        } catch (SQLException e) {
            throw new RuntimeException("Failed to store PDF certificate", e);
        }

        historiqueStatusRepo.save(historiqueStatus);

        byte[] newPdf = certificateFile.getBytes();
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"certificate.pdf\"").body(newPdf);
    }

}
