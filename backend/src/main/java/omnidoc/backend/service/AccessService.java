package omnidoc.backend.service;

import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.Medecin;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.AccessRepo;
import omnidoc.backend.repository.JockeyRepo;
import omnidoc.backend.repository.MedecinRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AccessService {
    @Autowired
    private AccessRepo accessRepo;
    @Autowired
    private MedecinRepo medecinRepo;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private JockeyRepo jockeyRepo;

    public void verifyAccess(int jockeyId){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Medecin medecin = medecinRepo.findByUser_Email(email).orElseThrow(()->new ApiException("not found"));
        Jockey jockey = jockeyRepo.findById(jockeyId).orElseThrow(()->new ApiException("not found"));
        boolean hasAccess = accessRepo.existsByMedecinAndJockey(medecin, jockey);
        System.out.println(hasAccess);
        if (!hasAccess){
            throw new ApiException("not allowed");

        }
    }

}
