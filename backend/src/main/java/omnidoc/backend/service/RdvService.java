package omnidoc.backend.service;

import jakarta.validation.Valid;
import omnidoc.backend.entity.rdv.Rdv;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.Medecin;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.JockeyRepo;
import omnidoc.backend.repository.MedecinRepo;
import omnidoc.backend.repository.RdvRepo;
import omnidoc.backend.request.RdvRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RdvService {
    @Autowired
    public RdvRepo rdvRepo;

    @Autowired
    public JockeyRepo jockeyRepo;
    @Autowired
    public MedecinRepo medecinRepo;

    public void createRdv(@Valid RdvRequest rdvRequest) {
        Jockey jockey = jockeyRepo.findById(rdvRequest.getJockeyId()).orElseThrow(() -> new ApiException("jockey not found"));
        Medecin medecin = medecinRepo.findById(rdvRequest.getMedecinId()).orElseThrow(() -> new ApiException("Medecin not found"));
        Rdv rdv = new Rdv();
        rdv.setDate(rdvRequest.getDate());
        rdv.setJockey(jockey);
        rdv.setMedecin(medecin);
        rdvRepo.save(rdv);
    }

}
