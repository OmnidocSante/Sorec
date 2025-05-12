package omnidoc.backend.util;

import omnidoc.backend.entity.antecedents_familiaux.AntecedentFamiliaux;
import omnidoc.backend.entity.antecent_personnel.AntecedentPersonnel;
import omnidoc.backend.entity.antecent_personnel.Condition;
import omnidoc.backend.entity.dossier.DossierMedicale;
import omnidoc.backend.entity.dossier.Hygiene;
import omnidoc.backend.entity.dossier.Medication;
import omnidoc.backend.entity.enums.Status;
import omnidoc.backend.entity.examens.*;
import omnidoc.backend.entity.examens.electrocardiogrammes.ElectrocardiogrammeEffort;
import omnidoc.backend.entity.examens.electrocardiogrammes.ElectrocardiogrammeRepos;
import omnidoc.backend.entity.examens.parametresExamens.ParametresCardioVasculaire;
import omnidoc.backend.entity.examens.parametresExamens.ParametresExamenCardioVasculaire;
import omnidoc.backend.entity.examens.parametresExamens.ParametresExamenLocomoteur;
import omnidoc.backend.entity.examens.parametresExamens.ParametresLocomoteur;
import omnidoc.backend.entity.resultat.Conclusion;
import omnidoc.backend.entity.resultat.ResultatExamenParaclinique;
import omnidoc.backend.entity.users.Jockey;
import omnidoc.backend.entity.users.User;
import omnidoc.backend.exceptions.ApiException;
import omnidoc.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class DossierMedicaleUtil {
    @Autowired
    private JockeyRepo jockeyRepo;
    @Autowired
    private DossierMedicaleRepo dossierMedicaleRepo;
    @Autowired
    private ConditionRepo conditionRepo;
    @Autowired

    private AntecedentPersonnelRepo antecedentPersonnelRepo;
    @Autowired
    private ExamenCardioVasculaireRepo examenCardioVasculaireRepo;
    @Autowired
    private HygieneRepo hygieneRepo;
    @Autowired
    private MedicationRepo medicationRepo;
    @Autowired
    private ExamenPleuroPulmonaireRepo examenPleuroPulmonaireRepo;
    @Autowired
    private ExamenOphtalmogiqueRepo examenOphtalmogiqueRepo;
    @Autowired
    private ExamenAuditifRepo examenAuditifRepo;
    @Autowired
    private parametresExamenCardioVasculaireRepo parametresExamenCardioVasculaireRepo;
    @Autowired
    private ParametresCardioVasculaireRepo parametresCardioVasculaireRepo;
    @Autowired
    private ParametresLocomoteurRepo parametresLocomoteurRepo;
    @Autowired
    private ParametresExamenLocomoteurRepo parametresExamenLocomoteurRepo;
    @Autowired
    private ExamenLocomoteurRepo examenLocomoteurRepo;
    @Autowired
    private ExamenNeurologiqueRepo examenNeurologiqueRepo;
    @Autowired
    private ExamenAbdominalRepo examenAbdominalRepo;
    @Autowired
    private ExamenGenitoUrinaireRepo examenGenitoUrinaireRepo;
    @Autowired
    private ElectrocardiogrammeReposRepo electrocardiogrammeReposRepo;
    @Autowired
    private ElectrocardiogrammeEffortRepo electrocardiogrammeEffortRepo;
    @Autowired
    private ResultatExamenParacliniqueRepo resultatExamenParacliniqueRepo;
    @Autowired
    private ConclusionRepo conclusionRepo;
    @Autowired
    private AntecedentFamiliauxRepo antecedentFamiliauxRepo;


    public void createDossier(User createdUser) throws Exception {
        Jockey jockey = new Jockey();
        jockey.setUser(createdUser);
        jockey.setStatus(Status.NON_APTE);
        jockeyRepo.save(jockey);

        DossierMedicale dossierMedicale = new DossierMedicale();
        dossierMedicale.setJockey(jockey);
        dossierMedicale.setIsCurrent(true);
        dossierMedicaleRepo.save(dossierMedicale);

        List<Condition> conditions = conditionRepo.findAll();
        List<AntecedentPersonnel> defaultAntecedents = new ArrayList<>();

        for (Condition c : conditions) {
            AntecedentPersonnel ap = new AntecedentPersonnel();
            ap.setCondition(c);
            ap.setDossierMedicale(dossierMedicale);
            ap.setHasCondition(null);
            ap.setRemarques(null);
            defaultAntecedents.add(ap);
        }

        antecedentPersonnelRepo.saveAll(defaultAntecedents);

        List<ParametresCardioVasculaire> parametres = parametresCardioVasculaireRepo.findAll();
        List<ParametresExamenCardioVasculaire> defaultParametres = new ArrayList<>();

        ExamenCardioVasculaire examenCardioVasculaire = new ExamenCardioVasculaire();
        examenCardioVasculaire.setParametresExamenCardioVasculaires(defaultParametres);
        examenCardioVasculaire.setAusculationDebout(null);
        examenCardioVasculaire.setAusculationCouche(null);
        examenCardioVasculaire.setAusculationObservation(null);

        examenCardioVasculaire.setFrequenceDebout(null);
        examenCardioVasculaire.setFrequenceCouche(null);
        examenCardioVasculaire.setFrequenceObservation(null);

        examenCardioVasculaire.setTensionDebout(null);
        examenCardioVasculaire.setTensionCouche(null);
        examenCardioVasculaire.setTensionObservation(null);
        examenCardioVasculaire.setDossierMedicale(dossierMedicale);
        examenCardioVasculaireRepo.save(examenCardioVasculaire);


        for (ParametresCardioVasculaire p : parametres) {
            ParametresExamenCardioVasculaire parametresExamen = new ParametresExamenCardioVasculaire();
            parametresExamen.setParametresCardioVasculaire(p);
            parametresExamen.setHasCondition(null);
            parametresExamen.setObservations(null);
            parametresExamen.setExamenCardioVasculaire(examenCardioVasculaire);
            defaultParametres.add(parametresExamen);
        }

        parametresExamenCardioVasculaireRepo.saveAll(defaultParametres);


        Hygiene hygiene = new Hygiene();
        hygiene.setDossierMedicale(dossierMedicale);
        hygiene.setHabitudesAlimentaire(null);
        hygiene.setAllergiesAlimentaire(null);
        hygiene.setTabac(null);
        hygiene.setAlcool(null);
        hygiene.setHydratation(null);
        hygiene.setSommeil(null);
        hygiene.setAutres(null);
        hygieneRepo.save(hygiene);

        ExamenPleuroPulmonaire examenPleuroPulmonaire = new ExamenPleuroPulmonaire();
        examenPleuroPulmonaire.setDossierMedicale(dossierMedicale);
        examenPleuroPulmonaire.setAustucultation(null);
        examenPleuroPulmonaire.setInspection(null);
        examenPleuroPulmonaire.setFrequence_respiratoire(null);
        examenPleuroPulmonaireRepo.save(examenPleuroPulmonaire);

        ExamenOphtalmogique examenOphtalmogique = new ExamenOphtalmogique();
        examenOphtalmogique.setDossierMedicale(dossierMedicale);
        examenOphtalmogique.setOdCorrige(null);
        examenOphtalmogique.setOdNonCorrige(null);
        examenOphtalmogique.setOgCorrige(null);
        examenOphtalmogique.setOgNonCorrige(null);
        examenOphtalmogique.setPaupieresEtCorneesNormale(null);
        examenOphtalmogiqueRepo.save(examenOphtalmogique);

        ExamenAuditif examenAuditif = new ExamenAuditif();
        examenAuditif.setDossierMedicale(dossierMedicale);
        examenAuditif.setAcuiteAuditiveADistanceOg(null);
        examenAuditif.setAcuiteAuditiveADistanceOd(null);
        examenAuditif.setConduitAuditifEtMembranesTympaniqueNormales(null);
        examenAuditifRepo.save(examenAuditif);


        ExamenLocomoteur examenLocomoteur = new ExamenLocomoteur();
        examenLocomoteur.setDossierMedicale(dossierMedicale);
        examenLocomoteur.setForceHanche(null);
        examenLocomoteur.setForceCheville(null);
        examenLocomoteur.setForceCoude(null);
        examenLocomoteur.setForcePoignet(null);
        examenLocomoteur.setForceEpaule(null);
        examenLocomoteur.setForceGenoux(null);
        examenLocomoteur.setForceTendons(null);
        examenLocomoteurRepo.save(examenLocomoteur);


        List<ParametresLocomoteur> parametresLocomoteurs = parametresLocomoteurRepo.findAll();
        List<ParametresExamenLocomoteur> parametresExamenLocomoteurs = new ArrayList<>();
        for (ParametresLocomoteur parametresLocomoteur : parametresLocomoteurs) {
            ParametresExamenLocomoteur parametresExamenLocomoteur = new ParametresExamenLocomoteur();
            parametresExamenLocomoteur.setParametre(parametresLocomoteur);
            parametresExamenLocomoteur.setObservations(null);
            parametresExamenLocomoteur.setHasCondition(null);
            parametresExamenLocomoteur.setExamenLocomoteur(examenLocomoteur);
            parametresExamenLocomoteurs.add(parametresExamenLocomoteur);
        }
        parametresExamenLocomoteurRepo.saveAll(parametresExamenLocomoteurs);

        ExamenNeurologique examenNeurologique = new ExamenNeurologique();
        examenNeurologique.setDossierMedicale(dossierMedicale);
        examenNeurologique.setReflexePupillaire(null);
        examenNeurologique.setReflexesOstéoTendineux(null);
        examenNeurologique.setCoordination(null);
        examenNeurologique.setEquilibre(null);
        examenNeurologique.setSensibilite(null);
        examenNeurologique.setMotricite(null);
        examenNeurologique.setTonicite(null);
        examenNeurologique.setAutres(null);
        examenNeurologiqueRepo.save(examenNeurologique);


        ExamenAbdominal examenAbdominal = new ExamenAbdominal();
        examenAbdominal.setDossierMedicale(dossierMedicale);
        examenAbdominal.setOropharynx(null);
        examenAbdominal.setFoie(null);
        examenAbdominal.setRate(null);
        examenAbdominal.setAutres(null);
        examenAbdominalRepo.save(examenAbdominal);

        ExamenGenitoUrinaire examenGenitoUrinaire = new ExamenGenitoUrinaire();
        examenGenitoUrinaire.setDossierMedicale(dossierMedicale);
        examenGenitoUrinaire.setValeurAlbumine(null);
        examenGenitoUrinaire.setValeurAutres(null);
        examenGenitoUrinaire.setValeurGlucose(null);
        examenGenitoUrinaire.setValeurSang(null);
        examenGenitoUrinaire.setObservationAlbumine(null);
        examenGenitoUrinaire.setObservationAutres(null);
        examenGenitoUrinaire.setObservationGlucose(null);
        examenGenitoUrinaire.setObservationSang(null);
        examenGenitoUrinaireRepo.save(examenGenitoUrinaire);

        ElectrocardiogrammeRepos electrocardiogrammeRepos = new ElectrocardiogrammeRepos();
        electrocardiogrammeRepos.setDossierMedicale(dossierMedicale);
        electrocardiogrammeRepos.setFrequenceCardiaque(null);
        electrocardiogrammeRepos.setRythme(null);
        electrocardiogrammeRepos.setConduction(null);
        electrocardiogrammeRepos.setAxeQRS(null);
        electrocardiogrammeRepos.setRepolarisation(null);
        electrocardiogrammeReposRepo.save(electrocardiogrammeRepos);


        ElectrocardiogrammeEffort electrocardiogrammeEffort = new ElectrocardiogrammeEffort();
        electrocardiogrammeEffort.setDossierMedicale(dossierMedicale);
        electrocardiogrammeEffort.setFrequenceCardiaque(null);
        electrocardiogrammeEffort.setRythme(null);
        electrocardiogrammeEffort.setConduction(null);
        electrocardiogrammeEffort.setAxeQRS(null);
        electrocardiogrammeEffort.setRepolarisation(null);
        electrocardiogrammeEffortRepo.save(electrocardiogrammeEffort);

        ResultatExamenParaclinique resultatExamenParaclinique = new ResultatExamenParaclinique();
        resultatExamenParaclinique.setDossierMedicale(dossierMedicale);
        resultatExamenParaclinique.setEchocardiographie(null);
        resultatExamenParaclinique.setTensionArterielleAuRepos(null);
        resultatExamenParaclinique.setTensionArtériellALeffort(null);
        resultatExamenParaclinique.setRadiographieDuPoumon(null);
        resultatExamenParaclinique.setRadiographieDuRachisLombaire(null);
        resultatExamenParacliniqueRepo.save(resultatExamenParaclinique);

        Conclusion conclusion = new Conclusion();
        conclusion.setDossierMedicale(dossierMedicale);
        conclusion.setCardioVasculaire(null);
        conclusion.setPleuropulmonaire(null);
        conclusion.setOphtalmique(null);
        conclusion.setAuditif(null);
        conclusion.setNeurologique(null);
        conclusion.setAbdominal(null);
        conclusion.setUrogénital(null);
        conclusion.setParaclinique(null);
        conclusionRepo.save(conclusion);

        AntecedentFamiliaux antecedentFamiliaux = new AntecedentFamiliaux();
        antecedentFamiliaux.setDossierMedicale(dossierMedicale);
        antecedentFamiliaux.setAsthme(null);
        antecedentFamiliaux.setMedicaux(null);
        antecedentFamiliaux.setMortSubite(null);
        antecedentFamiliaux.setMaladiesMetaboliques(null);
        antecedentFamiliaux.setAutres(null);
        antecedentFamiliauxRepo.save(antecedentFamiliaux);


    }

    public void copyDossier(Jockey jockey) {
        DossierMedicale oldDossierMedicale = dossierMedicaleRepo.getDossierMedicaleByJockey_IdAndIsCurrentTrue(jockey.getId()).orElseThrow(() -> new ApiException("Dossier not found"));
        dossierMedicaleRepo.deactivateOldVersions(jockey.getId());

        DossierMedicale dossierMedicale = new DossierMedicale();
        dossierMedicale.setJockey(jockey);
        dossierMedicale.setIsCurrent(true);

        dossierMedicaleRepo.save(dossierMedicale);

        List<AntecedentPersonnel> copiedAntecedents = oldDossierMedicale.getAntecedentPersonnels().stream().map(oldAp -> {
            AntecedentPersonnel newAp = new AntecedentPersonnel();
            newAp.setCondition(oldAp.getCondition());
            newAp.setHasCondition(oldAp.getHasCondition());
            newAp.setRemarques(oldAp.getRemarques());
            newAp.setDossierMedicale(dossierMedicale);
            return newAp;
        }).toList();

        antecedentPersonnelRepo.saveAll(copiedAntecedents);


        ExamenCardioVasculaire oldExamenCardioVasculaire = oldDossierMedicale.getExamenCardioVasculaire();

        ExamenCardioVasculaire examenCardioVasculaire = new ExamenCardioVasculaire();
        examenCardioVasculaire.setDossierMedicale(dossierMedicale);
        examenCardioVasculaire.setTensionCouche(oldExamenCardioVasculaire.getTensionCouche());
        examenCardioVasculaire.setTensionDebout(oldExamenCardioVasculaire.getTensionDebout());
        examenCardioVasculaire.setTensionObservation(oldExamenCardioVasculaire.getTensionObservation());
        examenCardioVasculaire.setAusculationObservation(oldExamenCardioVasculaire.getAusculationObservation());
        examenCardioVasculaire.setAusculationCouche(oldExamenCardioVasculaire.getAusculationCouche());
        examenCardioVasculaire.setAusculationDebout(oldExamenCardioVasculaire.getAusculationDebout());
        examenCardioVasculaire.setFrequenceCouche(oldExamenCardioVasculaire.getFrequenceCouche());
        examenCardioVasculaire.setFrequenceDebout(oldExamenCardioVasculaire.getFrequenceDebout());
        examenCardioVasculaire.setFrequenceObservation(oldExamenCardioVasculaire.getFrequenceObservation());

        examenCardioVasculaireRepo.save(examenCardioVasculaire);

        List<ParametresExamenCardioVasculaire> copiedParametres = oldExamenCardioVasculaire.getParametresExamenCardioVasculaires().stream().map(parametresExamen -> {
            ParametresExamenCardioVasculaire newParametres = new ParametresExamenCardioVasculaire();
            newParametres.setHasCondition(parametresExamen.getHasCondition());
            newParametres.setObservations(parametresExamen.getObservations());
            newParametres.setParametresCardioVasculaire(parametresExamen.getParametresCardioVasculaire());
            newParametres.setExamenCardioVasculaire(examenCardioVasculaire);
            return newParametres;
        }).toList();

        parametresExamenCardioVasculaireRepo.saveAll(copiedParametres);

        Hygiene hygiene = new Hygiene();
        hygiene.setAutres(oldDossierMedicale.getHygiene().getAutres());
        hygiene.setHydratation(oldDossierMedicale.getHygiene().getHydratation());
        hygiene.setAlcool(oldDossierMedicale.getHygiene().getAlcool());
        hygiene.setHabitudesAlimentaire(oldDossierMedicale.getHygiene().getHabitudesAlimentaire());
        hygiene.setAllergiesAlimentaire(oldDossierMedicale.getHygiene().getAllergiesAlimentaire());
        hygiene.setSommeil(oldDossierMedicale.getHygiene().getSommeil());
        hygiene.setDossierMedicale(dossierMedicale);

        hygieneRepo.save(hygiene);

        List<Medication> medications = oldDossierMedicale.getMedications().stream().map(medication -> {
            Medication newMedication = new Medication();
            newMedication.setDossierMedicale(dossierMedicale);
            newMedication.setMedicament(medication.getMedicament());
            newMedication.setMedecin(medication.getMedecin());
            newMedication.setCauseDuTraitement(medication.getCauseDuTraitement());
            return newMedication;
        }).toList();
        medicationRepo.saveAll(medications);

        ExamenPleuroPulmonaire oldDossierMedicaleExamenPleuroPulmonaire = oldDossierMedicale.getExamenPleuroPulmonaire();

        ExamenPleuroPulmonaire examenPleuroPulmonaire = new ExamenPleuroPulmonaire();
        examenPleuroPulmonaire.setDossierMedicale(dossierMedicale);
        examenPleuroPulmonaire.setAustucultation(oldDossierMedicaleExamenPleuroPulmonaire.getAustucultation());
        examenPleuroPulmonaire.setInspection(oldDossierMedicaleExamenPleuroPulmonaire.getInspection());
        examenPleuroPulmonaire.setFrequence_respiratoire(oldDossierMedicaleExamenPleuroPulmonaire.getFrequence_respiratoire());
        examenPleuroPulmonaireRepo.save(examenPleuroPulmonaire);


        ExamenOphtalmogique oldExamenOphtalmogique = oldDossierMedicale.getExamenOphtalmogique();

        ExamenOphtalmogique examenOphtalmogique = new ExamenOphtalmogique();
        examenOphtalmogique.setDossierMedicale(dossierMedicale);
        examenOphtalmogique.setOdCorrige(oldExamenOphtalmogique.getOdCorrige());
        examenOphtalmogique.setOdNonCorrige(oldExamenOphtalmogique.getOdNonCorrige());
        examenOphtalmogique.setOgCorrige(oldExamenOphtalmogique.getOgCorrige());
        examenOphtalmogique.setOgNonCorrige(oldExamenOphtalmogique.getOgNonCorrige());
        examenOphtalmogique.setPaupieresEtCorneesNormale(oldExamenOphtalmogique.getPaupieresEtCorneesNormale());
        examenOphtalmogiqueRepo.save(examenOphtalmogique);

        ExamenAuditif oldExamAuditif = oldDossierMedicale.getExamenAuditif();
        ExamenAuditif examenAuditif = new ExamenAuditif();
        examenAuditif.setDossierMedicale(dossierMedicale);
        examenAuditif.setAcuiteAuditiveADistanceOg(oldExamAuditif.getAcuiteAuditiveADistanceOg());
        examenAuditif.setAcuiteAuditiveADistanceOd(oldExamAuditif.getAcuiteAuditiveADistanceOd());
        examenAuditif.setConduitAuditifEtMembranesTympaniqueNormales(oldExamAuditif.getConduitAuditifEtMembranesTympaniqueNormales());
        examenAuditifRepo.save(examenAuditif);

        ExamenLocomoteur oldExamenLocomoteur = oldDossierMedicale.getExamenLocomoteur();
        ExamenLocomoteur examenLocomoteur =  new ExamenLocomoteur();
        examenLocomoteur.setDossierMedicale(dossierMedicale);
        examenLocomoteur.setForceHanche(oldExamenLocomoteur.getForceHanche());
        examenLocomoteur.setForceCheville(oldExamenLocomoteur.getForceCheville());
        examenLocomoteur.setForceCoude(oldExamenLocomoteur.getForceCoude());
        examenLocomoteur.setForcePoignet(oldExamenLocomoteur.getForcePoignet());
        examenLocomoteur.setForceEpaule(oldExamenLocomoteur.getForceEpaule());
        examenLocomoteur.setForceGenoux(oldExamenLocomoteur.getForceGenoux());
        examenLocomoteur.setForceTendons(oldExamenLocomoteur.getForceTendons());
        examenLocomoteurRepo.save(examenLocomoteur);


        List<ParametresExamenLocomoteur> parametresExamenLocomoteurs = oldDossierMedicale.getExamenLocomoteur().getParametresExamenLocomoteurs().stream().map(parametresExamenLocomoteur -> {
            ParametresExamenLocomoteur newParametre = new ParametresExamenLocomoteur();
            newParametre.setExamenLocomoteur(examenLocomoteur);
            newParametre.setObservations(parametresExamenLocomoteur.getObservations());
            newParametre.setHasCondition(parametresExamenLocomoteur.getHasCondition());
            newParametre.setParametre(parametresExamenLocomoteur.getParametre());
            return newParametre;
        }).toList();
        parametresExamenLocomoteurRepo.saveAll(parametresExamenLocomoteurs);

        ExamenNeurologique oldExamenNeurologique = oldDossierMedicale.getExamenNeurologique();
        ExamenNeurologique examenNeurologique = new ExamenNeurologique();
        examenNeurologique.setDossierMedicale(dossierMedicale);
        examenNeurologique.setReflexePupillaire(oldExamenNeurologique.getReflexePupillaire());
        examenNeurologique.setReflexesOstéoTendineux(oldExamenNeurologique.getReflexesOstéoTendineux());
        examenNeurologique.setCoordination(oldExamenNeurologique.getCoordination());
        examenNeurologique.setEquilibre(oldExamenNeurologique.getEquilibre());
        examenNeurologique.setSensibilite(oldExamenNeurologique.getSensibilite());
        examenNeurologique.setMotricite(oldExamenNeurologique.getMotricite());
        examenNeurologique.setTonicite(oldExamenNeurologique.getTonicite());
        examenNeurologique.setAutres(oldExamenNeurologique.getAutres());
        examenNeurologiqueRepo.save(examenNeurologique);

        ExamenAbdominal oldExamenAbdominale = oldDossierMedicale.getExamenAbdominal();
        ExamenAbdominal examenAbdominal = new ExamenAbdominal();
        examenAbdominal.setDossierMedicale(dossierMedicale);
        examenAbdominal.setOropharynx(oldExamenAbdominale.getOropharynx());
        examenAbdominal.setFoie(oldExamenAbdominale.getFoie());
        examenAbdominal.setRate(oldExamenAbdominale.getRate());
        examenAbdominal.setAutres(oldExamenAbdominale.getAutres());
        examenAbdominalRepo.save(examenAbdominal);

        ExamenGenitoUrinaire oldExamenGenitoUrinaire = oldDossierMedicale.getExamenGenitoUrinaire();
        ExamenGenitoUrinaire examenGenitoUrinaire = new ExamenGenitoUrinaire();
        examenGenitoUrinaire.setDossierMedicale(dossierMedicale);
        examenGenitoUrinaire.setValeurAlbumine(oldExamenGenitoUrinaire.getValeurAlbumine());
        examenGenitoUrinaire.setValeurAutres(oldExamenGenitoUrinaire.getValeurAutres());
        examenGenitoUrinaire.setValeurGlucose(oldExamenGenitoUrinaire.getValeurGlucose());
        examenGenitoUrinaire.setValeurSang(oldExamenGenitoUrinaire.getValeurSang());
        examenGenitoUrinaire.setObservationAlbumine(oldExamenGenitoUrinaire.getObservationAlbumine());
        examenGenitoUrinaire.setObservationAutres(oldExamenGenitoUrinaire.getObservationAutres());
        examenGenitoUrinaire.setObservationGlucose(oldExamenGenitoUrinaire.getObservationGlucose());
        examenGenitoUrinaire.setObservationSang(oldExamenGenitoUrinaire.getObservationSang());
        examenGenitoUrinaireRepo.save(examenGenitoUrinaire);


        ElectrocardiogrammeRepos oldElectrocardiogrammeRepos = oldDossierMedicale.getElectrocardiogrammeRepos();
        ElectrocardiogrammeRepos electrocardiogrammeRepos = new ElectrocardiogrammeRepos();
        electrocardiogrammeRepos.setDossierMedicale(dossierMedicale);
        electrocardiogrammeRepos.setFrequenceCardiaque(oldElectrocardiogrammeRepos.getFrequenceCardiaque());
        electrocardiogrammeRepos.setRythme(oldElectrocardiogrammeRepos.getRythme());
        electrocardiogrammeRepos.setConduction(oldElectrocardiogrammeRepos.getConduction());
        electrocardiogrammeRepos.setAxeQRS(oldElectrocardiogrammeRepos.getAxeQRS());
        electrocardiogrammeRepos.setRepolarisation(oldElectrocardiogrammeRepos.getRepolarisation());
        electrocardiogrammeReposRepo.save(electrocardiogrammeRepos);

        ElectrocardiogrammeEffort oldElectrocardiogrammeEffort = oldDossierMedicale.getElectrocardiogrammeEffort();
        ElectrocardiogrammeEffort electrocardiogrammeEffort = new ElectrocardiogrammeEffort();
        electrocardiogrammeEffort.setDossierMedicale(dossierMedicale);
        electrocardiogrammeEffort.setFrequenceCardiaque(oldElectrocardiogrammeEffort.getFrequenceCardiaque());
        electrocardiogrammeEffort.setRythme(oldElectrocardiogrammeEffort.getRythme());
        electrocardiogrammeEffort.setConduction(oldElectrocardiogrammeEffort.getConduction());
        electrocardiogrammeEffort.setAxeQRS(oldElectrocardiogrammeEffort.getAxeQRS());
        electrocardiogrammeEffort.setRepolarisation(oldElectrocardiogrammeEffort.getRepolarisation());
        electrocardiogrammeEffortRepo.save(electrocardiogrammeEffort);


        ResultatExamenParaclinique oldResultatExamenParaclinique = oldDossierMedicale.getResultatExamenParaclinique();
        ResultatExamenParaclinique resultatExamenParaclinique = new ResultatExamenParaclinique();
        resultatExamenParaclinique.setDossierMedicale(dossierMedicale);
        resultatExamenParaclinique.setEchocardiographie(oldResultatExamenParaclinique.getEchocardiographie());
        resultatExamenParaclinique.setTensionArterielleAuRepos(oldResultatExamenParaclinique.getTensionArterielleAuRepos());
        resultatExamenParaclinique.setTensionArtériellALeffort(oldResultatExamenParaclinique.getTensionArtériellALeffort());
        resultatExamenParaclinique.setRadiographieDuPoumon(oldResultatExamenParaclinique.getRadiographieDuPoumon());
        resultatExamenParaclinique.setRadiographieDuRachisLombaire(oldResultatExamenParaclinique.getRadiographieDuRachisLombaire());
        resultatExamenParacliniqueRepo.save(resultatExamenParaclinique);


        Conclusion oldConclusion = oldDossierMedicale.getConclusion();
        Conclusion conclusion = new Conclusion();
        conclusion.setDossierMedicale(dossierMedicale);
        conclusion.setCardioVasculaire(oldConclusion.getCardioVasculaire());
        conclusion.setPleuropulmonaire(oldConclusion.getPleuropulmonaire());
        conclusion.setOphtalmique(oldConclusion.getOphtalmique());
        conclusion.setAuditif(oldConclusion.getAuditif());
        conclusion.setNeurologique(oldConclusion.getNeurologique());
        conclusion.setAbdominal(oldConclusion.getAbdominal());
        conclusion.setUrogénital(oldConclusion.getUrogénital());
        conclusion.setParaclinique(oldConclusion.getParaclinique());
        conclusionRepo.save(conclusion);

        AntecedentFamiliaux oldAntecedantFamilaux = oldDossierMedicale.getAntecedentFamiliaux();
        AntecedentFamiliaux antecedentFamiliaux = new AntecedentFamiliaux();
        antecedentFamiliaux.setDossierMedicale(dossierMedicale);
        antecedentFamiliaux.setAsthme(oldAntecedantFamilaux.getAsthme());
        antecedentFamiliaux.setMedicaux(oldAntecedantFamilaux.getMedicaux());
        antecedentFamiliaux.setMortSubite(oldAntecedantFamilaux.getMortSubite());
        antecedentFamiliaux.setMaladiesMetaboliques(oldAntecedantFamilaux.getMaladiesMetaboliques());
        antecedentFamiliaux.setAutres(oldAntecedantFamilaux.getAutres());
        antecedentFamiliauxRepo.save(antecedentFamiliaux);


    }
}