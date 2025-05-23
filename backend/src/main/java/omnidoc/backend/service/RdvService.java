package omnidoc.backend.service;

import jakarta.validation.Valid;
import omnidoc.backend.entity.enums.StatusRDV;
import omnidoc.backend.entity.rdv.Rdv;
import omnidoc.backend.entity.users.Access;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.Medecin;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.records.RdvRecord;
import omnidoc.backend.repository.*;
import omnidoc.backend.request.RdvRequest;
import omnidoc.backend.util.DossierMedicaleUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RdvService {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private RdvRepo rdvRepo;

    @Autowired
    private JockeyRepo jockeyRepo;
    @Autowired
    private MedecinRepo medecinRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private DossierMedicaleUtil dossierMedicaleUtil;
    @Autowired
    private AccessRepo accessRepo;
    private JavaMailSender javaMailSender;


    public void createRdv(@Valid RdvRequest rdvRequest) {

        Jockey jockey = jockeyRepo.findByUser_Id(rdvRequest.getJockeyId()).orElseThrow(() -> new ApiException("jockey not found"));
        Medecin medecin = medecinRepo.findByUser_Id(rdvRequest.getMedecinId()).orElseThrow(() -> new ApiException("Medecin not found"));


        try {
            dossierMedicaleUtil.copyDossier(jockey);
            boolean hasAccess = accessRepo.existsByMedecinAndJockey(medecin, jockey);
            if (!hasAccess) {
                Access access = new Access();
                access.setMedecin(medecin);
                access.setJockey(jockey);
                accessRepo.save(access);
            }
            Rdv rdv = new Rdv();
            rdv.setDate(rdvRequest.getDate());
            rdv.setJockey(jockey);
            rdv.setMedecin(medecin);
            rdvRepo.save(rdv);
            emailService.sendEmail(medecin.getUser().getEmail(), "Nouveau rendez-vous médical programmé", "Bonjour Dr " + medecin.getUser().getNom() + ",\n\n" + "Un nouveau rendez-vous a été fixé avec le jockey " + jockey.getUser().getNom() + " " + jockey.getUser().getPrénom() + " le " + rdv.getDate().toString() + ".\n\n" + "Merci de bien vouloir le noter dans votre agenda.\n\n" + "Cordialement,\nL'équipe Omnidoc");

        } catch (Exception e) {
            throw new ApiException(e.getMessage());

        }

    }

    public List<RdvRecord> getAllAppointments() {
        return rdvRepo.findAll().stream().map(rdv -> new RdvRecord(rdv.getId(), rdv.getDate(), rdv.getJockey().getUser().getNom(), rdv.getJockey().getUser().getPrénom(), rdv.getMedecin().getUser().getNom(), rdv.getMedecin().getUser().getPrénom(), rdv.getStatusRDV(), rdv.getJockey().getId())).toList();
    }

    public List<RdvRecord> getDoctorAppointments(String jwt) {
        String token = jwt.substring(7);
        String username = jwtService.extractUsername(token);
        Medecin medecin = medecinRepo.findByUser_Email(username).orElseThrow(() -> new ApiException("Doctor not found"));

        return rdvRepo.findRdvsByMedecin(medecin).stream().map(rdv -> new RdvRecord(rdv.getId(), rdv.getDate(), rdv.getJockey().getUser().getNom(), rdv.getJockey().getUser().getPrénom(), rdv.getMedecin().getUser().getNom(), rdv.getMedecin().getUser().getPrénom(), rdv.getStatusRDV(), rdv.getJockey().getId())).toList();


    }


    public void createRdvByDoctor(@Valid RdvRequest rdvRequest, String jwt) {
        String token = jwt.substring(7);
        String username = jwtService.extractUsername(token);
        Jockey jockey = jockeyRepo.findByUser_Id(rdvRequest.getJockeyId()).orElseThrow(() -> new ApiException("jockey not found"));
        Medecin medecin = medecinRepo.findByUser_Email(username).orElseThrow(() -> new ApiException("Doctor not found"));

        try {
            dossierMedicaleUtil.copyDossier(jockey);
            boolean hasAccess = accessRepo.existsByMedecinAndJockey(medecin, jockey);
            if (!hasAccess) {
                Access access = new Access();
                access.setMedecin(medecin);
                access.setJockey(jockey);
                accessRepo.save(access);
            }
            Rdv rdv = new Rdv();
            rdv.setDate(rdvRequest.getDate());
            rdv.setJockey(jockey);
            rdv.setMedecin(medecin);
            rdvRepo.save(rdv);
        } catch (Exception e) {
            throw new ApiException(e.getMessage());
        }


    }

    public void changeStatusRDV(StatusRDV statusRDV, int rdvId) {
        System.out.println(statusRDV.name());
        Rdv rdv = rdvRepo.findById(rdvId).orElseThrow(() -> new ApiException("not found"));
        rdv.setStatusRDV(statusRDV);
        rdvRepo.save(rdv);
        if (statusRDV.equals(StatusRDV.ANNULE)) {
            emailService.sendEmail(rdv.getMedecin().getUser().getEmail(), "Annulation rdv", "le rendez vous avec " + rdv.getJockey().getUser().getNom() + " date " + rdv.getDate().format(java.time.format.DateTimeFormatter.ofPattern("yy-MM-dd HH:mm")) + " a été annulé");

            emailService.sendEmail(rdv.getJockey().getUser().getEmail(), "Annulation rdv", "le rendez vous avec " + rdv.getMedecin().getUser().getNom() + " date " + rdv.getDate().format(java.time.format.DateTimeFormatter.ofPattern("yy-MM-dd HH:mm")) + " a été annulé");
        }


    }


}
