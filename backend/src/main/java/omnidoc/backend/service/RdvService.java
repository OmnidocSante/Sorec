package omnidoc.backend.service;

import jakarta.validation.Valid;
import omnidoc.backend.entity.enums.StatusRDV;
import omnidoc.backend.entity.rdv.Rdv;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.Medecin;
import omnidoc.backend.entity.users.User;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.records.RdvRecord;
import omnidoc.backend.repository.JockeyRepo;
import omnidoc.backend.repository.MedecinRepo;
import omnidoc.backend.repository.RdvRepo;
import omnidoc.backend.repository.UserRepo;
import omnidoc.backend.request.RdvRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RdvService {
    @Autowired
    public JwtService jwtService;
    @Autowired
    public RdvRepo rdvRepo;
    @Autowired
    public UserRepo userRepo;

    @Autowired
    public JockeyRepo jockeyRepo;
    @Autowired
    public MedecinRepo medecinRepo;

    public void createRdv(@Valid RdvRequest rdvRequest) {

        Jockey jockey = jockeyRepo.findByUser_Id(rdvRequest.getJockeyId()).orElseThrow(() -> new ApiException("jockey not found"));
        Medecin medecin = medecinRepo.findByUser_Id(rdvRequest.getMedecinId()).orElseThrow(() -> new ApiException("Medecin not found"));
        try {
            Rdv rdv = new Rdv();
            rdv.setDate(rdvRequest.getDate());
            rdv.setJockey(jockey);
            rdv.setMedecin(medecin);
            rdvRepo.save(rdv);

        } catch (Exception e) {
            throw new ApiException(e.getMessage());

        }

    }

    public List<RdvRecord> getAllAppointments() {
        return rdvRepo.findAll().stream().map(rdv -> new RdvRecord(rdv.getId(), rdv.getDate(), rdv.getJockey().getUser().getNom(), rdv.getJockey().getUser().getPrénom(), rdv.getMedecin().getUser().getNom(), rdv.getMedecin().getUser().getPrénom(), rdv.getStatusRDV())).toList();
    }

    public List<RdvRecord> getDoctorAppointments(String jwt) {
        String token = jwt.substring(7);
        String username = jwtService.extractUsername(token);
        Medecin medecin = medecinRepo.findByUser_Email(username).orElseThrow(() -> new ApiException("Doctor not found"));

        return rdvRepo.findRdvsByMedecin(medecin).stream().map(rdv -> new RdvRecord(rdv.getId(), rdv.getDate(), rdv.getJockey().getUser().getNom(), rdv.getJockey().getUser().getPrénom(), rdv.getMedecin().getUser().getNom(), rdv.getMedecin().getUser().getPrénom(), rdv.getStatusRDV())).toList();


    }

    public void createRdvByDoctor(@Valid RdvRequest rdvRequest, String jwt) {
        String token = jwt.substring(7);
        String username = jwtService.extractUsername(token);
        Jockey jockey = jockeyRepo.findByUser_Id(rdvRequest.getJockeyId()).orElseThrow(() -> new ApiException("jockey not found"));
        Medecin medecin = medecinRepo.findByUser_Email(username).orElseThrow(() -> new ApiException("Doctor not found"));

        try {
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
    }

}
