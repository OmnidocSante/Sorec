package omnidoc.backend.config;

import lombok.extern.slf4j.Slf4j;
import omnidoc.backend.entity.enums.StatusRDV;
import omnidoc.backend.entity.rdv.Rdv;
import omnidoc.backend.repository.RdvRepo;
import omnidoc.backend.service.EmailService;
import omnidoc.backend.service.RdvService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
@Slf4j
public class Scheduler {

    private final RdvService rdvService;
    private final RdvRepo rdvRepo;
    private final EmailService emailService;

    public Scheduler(RdvService rdvService, RdvRepo rdvRepo, EmailService emailService) {
        this.rdvService = rdvService;
        this.rdvRepo = rdvRepo;
        this.emailService = emailService;
    }

    @Scheduled(fixedDelay = 86400000)
    public void scheduler() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime soon = now.plusHours(24);

        List<Rdv> upcomingRdvList = rdvRepo.findUpcomingValidRdv(now, soon, StatusRDV.ANNULE);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy à HH:mm");

        for (Rdv rdv : upcomingRdvList) {
            String dateFormatted = rdv.getDate().format(formatter);

            String sujetJockey = "Rappel de votre rendez-vous médical";
            String messageJockey = "Bonjour " + rdv.getJockey().getUser().getNom() + ",\n\n" + "Vous avez un rendez-vous avec le Dr. " + rdv.getMedecin().getUser().getNom() + " le " + dateFormatted + ".\n\n" + "Merci d'être à l'heure.";
            emailService.sendEmail(rdv.getJockey().getUser().getEmail(), sujetJockey, messageJockey);

            String sujetMedecin = "Rappel d'un rendez-vous à venir";
            String messageMedecin = "Bonjour Dr. " + rdv.getMedecin().getUser().getNom() + ",\n\n" + "Vous avez un rendez-vous avec le jockey " + rdv.getJockey().getUser().getNom() + " le " + dateFormatted + ".\n\n" + "Merci de vous préparer.";
            emailService.sendEmail(rdv.getMedecin().getUser().getEmail(), sujetMedecin, messageMedecin);
        }
    }

}
