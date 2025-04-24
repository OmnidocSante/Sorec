package omnidoc.backend.entity.enums;

public enum ConditionAntecedant {
    // 1- Appareil Cardio-vasculaire
    MALADIE_CARDIAQUE("Maladie cardiaque"),
    MALFORMATION_CARDIAQUE("Malformation cardiaque"),
    HYPERTENSION_ARTERIELLE("Hypertension artérielle"),
    MALADIE_DES_VAISSEAUX("Maladie des vaisseaux"),
    OPERATION_CARDIO_VASCULAIRE("Opération cardio-vasculaire"),
    SOUFFLE_CARDIAQUE_OU_TROUBLE_DU_RYTHME("Souffle cardiaque ou trouble du rythme"),
    EPREUVE_DEFFORT_MAXIMALE("Epreuve d’effort maximale"),
    ELECTROCARDIOGRAMME("Electrocardiogramme"),
    ECHOCARDIOGRAMME("Echocardiogramme"),
    MALAISE_OU_PERTE_DE_CONNAISSANCE("Malaise ou perte de connaissance"),
    DOULEUR_THORACIQUE("Douleur thoracique"),
    PALPITATIONS("Palpitations"),
    FATIGUE_INHABITUELLE("Fatigue inhabituelle"),
    TRAITEMENT_ANTICOAGULANTS("Traitement à base d'anticoagulants"),

    // 2- Appareil respiratoire
    ASTHME("Asthme"),
    BRONCHITE_CHRONIQUE_A_REPETITION("Bronchite chronique à répétition"),
    BRONCHO_PNEUMOPATHIE_SEVERE("Broncho-pneumopathie sévère"),
    PNEUMOTHORAX("Pneumothorax"),
    TRAUMATISME_THORACIQUE("Traumatisme thoracique"),
    TUBERCULOSE("Tuberculose"),

    // 3- Système nerveux
    TRAUMATISME_CRANIEN("Traumatisme crânien"),
    EPILEPSIE("Epilepsie"),
    CONVULSIONS("Convulsions"),
    PERTE_DE_CONNAISSANCE("Perte de connaissance"),
    CRISE_DE_TETANIE("Crise de tétanie"),
    MIGRAINE("Migraine"),
    MENINGITE("Méningite"),
    PROBLEMES_VERTEBRAUX_OU_ANOMALIE_MORPHOLOGIQUE("Problèmes vertébraux ou anomalie morphologique"),

    // 4- ORL
    ANGINE_REPETITIVES("Angine répétitives"),
    OTITE_REPETITIVES("Otite répétitives"),
    SINUSITES_REPETITIVES("Sinusites répétitives"),
    BON_ETAT_DE_DENTITION("Bon état de dentition"),
    CHIRURGIE_DE_LA_SPHERE_ORL("Chirurgie de la sphère ORL"),
    DEFICIT_DE_L_AUDITION("Déficit de l'audition"),
    TROUBLES_D_EQUILIBRE("Troubles d'équilibre"),
    FRACTURE_DU_NEZ("Fracture du nez"),
    PERFORATION_DU_TYMPAN("Perforation du tympan"),

    // 5- Allergies
    ALLERGIE_DIGESTIVE("Allergie digestive"),
    ALLERGIE_CUTANEE("Allergie cutanée"),
    ALLERGIES_MEDICAMENTEUSES("Allergies médicamenteuses"),

    // 6- Traumatologie
    LUXATION_ARTICULAIRE("Luxation articulaire"),
    FRACTURE("Fracture"),
    TENDINOPATHIE("Tendinopathie"),

    // 7- Appareil digestif
    INDIGESTION("Indigestion"),
    DOULEUR_APRES_REPAS("Douleur après repas"),
    ULCERE_GASTRIQUE_OU_DUODENALE("Ulcère gastrique ou duodénale"),
    HERNIE_HIATALE("Hernie hiatale"),
    DIARRHEE_RECURRENTE("Diarrhée récurrente"),
    APPENDICITE("Appendicite"),

    // 8- Endocrinologie
    DIABETE("Diabète"),
    GOITRE("Goitre"),
    ATTEINTE_DES_NODULES_LYMPHATIQUES("Atteinte des nodules lymphatiques"),

    // 9- Autres
    INTERVENTIONS_CHIRURGICALES_OU_HOSPITALISATION("Interventions chirurgicales ou hospitalisation");

    private final String label;

    ConditionAntecedant(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}