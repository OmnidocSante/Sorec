package omnidoc.backend.controller;

import omnidoc.backend.entity.dossier.FieldVisibility;
import omnidoc.backend.service.FieldVisibilityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/field-visibility")
public class FieldVisibilityController {

    private final FieldVisibilityService service;

    public FieldVisibilityController(FieldVisibilityService service) {
        this.service = service;
    }

    @GetMapping("/{tableName}")
    public List<FieldVisibility> getFields(@PathVariable String tableName) {
        return service.getForTable(tableName);
    }

    @PutMapping("/{tableName}")
    public ResponseEntity<Void> updateVisibility(@PathVariable String tableName, @RequestBody Map<String, Boolean> fieldMap) {
        service.updateVisibility(tableName, fieldMap);
        return ResponseEntity.ok().build();
    }
}
