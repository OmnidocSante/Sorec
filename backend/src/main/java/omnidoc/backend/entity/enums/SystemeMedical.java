package omnidoc.backend.entity.enums;

public enum SystemeMedical {
    APPAREIL_CARDIO_VASCULAIRE("Appareil Cardio-vasculaire"),
    APPAREIL_RESPIRATOIRE("Appareil respiratoire"),
    SYSTEME_NERVEUX("Système nerveux"),
    ORL("ORL"),
    ALLERGIES("Allergies"),
    TRAUMATOLOGIE("Traumatologie"),
    APPAREIL_DIGESTIF("Appareil digestif"),
    ENDOCRINOLOGIE("Endocrinologie"),
    AUTRES("Autres");

    private final String nom;

    SystemeMedical(String nom) {
        this.nom = nom;
    }

    public String getNom() {
        return nom;
    }

    @Override
    public String toString() {
        return nom;
    }
}