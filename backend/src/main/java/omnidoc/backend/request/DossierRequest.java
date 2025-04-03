package omnidoc.backend.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class DossierRequest {
    private int jockeyId;
    private Map<String, String> champsModifies;
    private String blood;
}
