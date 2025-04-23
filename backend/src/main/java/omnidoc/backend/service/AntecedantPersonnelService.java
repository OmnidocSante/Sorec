package omnidoc.backend.service;

import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.repository.AntecedentPersonnelRepo;
import omnidoc.backend.repository.DossierMedicaleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AntecedantPersonnelService {
    @Autowired
    private AntecedentPersonnelRepo antecedentPersonnelRepo;

    @Autowired
    private DossierMedicaleRepo dossierMedicaleRepo;

}
