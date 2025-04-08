package omnidoc.backend.controller;

import omnidoc.backend.entity.rdv.Rdv;
import omnidoc.backend.records.RdvRecord;
import omnidoc.backend.request.RdvRequest;
import omnidoc.backend.service.RdvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rdvs")
public class RdvController {
    @Autowired
    public RdvService rdvService;


    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','MEDECIN')")
    public ResponseEntity<Void> addRdv(@RequestBody RdvRequest rdvRequest) {
        rdvService.createRdv(rdvRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','MEDECIN')")
    public ResponseEntity<List<RdvRecord>> getAllRdvs() {
        return new ResponseEntity<>(rdvService.getAllAppointments(), HttpStatus.OK);
    }

    @GetMapping("/doctor")
    @PreAuthorize("hasAnyAuthority('ADMIN','MEDECIN')")
    public ResponseEntity<List<RdvRecord>> getDoctorRdv(@RequestHeader("Authorization") String jwt) {
        return new ResponseEntity<>(rdvService.getDoctorAppointments(jwt), HttpStatus.OK);
    }



}
