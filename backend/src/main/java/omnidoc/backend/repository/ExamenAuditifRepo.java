package omnidoc.backend.repository;

import omnidoc.backend.entity.examens.ExamenAuditif;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamenAuditifRepo extends JpaRepository<ExamenAuditif,Integer> {
}
