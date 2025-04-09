package omnidoc.backend.records;

import omnidoc.backend.entity.enums.StatusRDV;

import java.time.LocalDateTime;

public record RdvRecord(int id,LocalDateTime dateTime, String userName, String userLastName, String doctorName, String doctorLastName,
                        StatusRDV statusRDV) {
}
