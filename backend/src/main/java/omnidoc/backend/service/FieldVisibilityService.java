package omnidoc.backend.service;


import lombok.RequiredArgsConstructor;
import omnidoc.backend.entity.dossier.FieldVisibility;
import omnidoc.backend.repository.FieldVisibilityRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FieldVisibilityService {

    private final FieldVisibilityRepo repository;

    public List<FieldVisibility> getForTable(String tableName) {
        return repository.findByTableName(tableName);
    }

    public void updateVisibility(String tableName, Map<String, Boolean> fieldMap) {
        for (Map.Entry<String, Boolean> entry : fieldMap.entrySet()) {
            FieldVisibility fv = repository.findByTableNameAndFieldName(tableName, entry.getKey()).orElse(new FieldVisibility());
            fv.setTableName(tableName);
            fv.setFieldName(entry.getKey());
            fv.setHidden(entry.getValue());
            repository.save(fv);
        }
    }

    public Set<String> getHiddenFields(String tableName) {
        return repository.findByTableName(tableName).stream().filter(FieldVisibility::isHidden).map(FieldVisibility::getFieldName).collect(Collectors.toSet());
    }

}