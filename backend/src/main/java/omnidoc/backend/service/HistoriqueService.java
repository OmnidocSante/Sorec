package omnidoc.backend.service;

import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.repository.DossierMedicaleRepo;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class HistoriqueService {
    private final DossierMedicaleRepo dossierMedicaleRepo;

    public HistoriqueService(DossierMedicaleRepo dossierMedicaleRepo) {
        this.dossierMedicaleRepo = dossierMedicaleRepo;
    }

    public List<DossierMedicale> fetchHistorique(int jockeyId){
        return dossierMedicaleRepo.getDossierMedicalesByJockey_IdAndIsCurrentFalse(jockeyId);
    }
}
