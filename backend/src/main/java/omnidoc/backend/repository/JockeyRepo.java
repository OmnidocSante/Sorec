package omnidoc.backend.repository;

import omnidoc.backend.entity.users.Jockey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface JockeyRepo extends JpaRepository<Jockey, Integer> {
    @Transactional
    void deleteByUser_Id(int userId);

    Optional<Jockey> findByUser_Id(int userId);

}
