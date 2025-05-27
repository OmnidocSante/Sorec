package omnidoc.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.text.Normalizer;

@Service
public class SmsService {

    private static final String API_URL = "http://www.moroccosms.com/sms/api_v1";
    private static final String SUB_ACCOUNT = "108_212";
    private static final String SUB_ACCOUNT_PASS = "omnidoc876";
    private static final String SENDER_ID = "OMNIDOC";

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendSms(String phone, String message) {
        String formattedPhone = formatPhoneNumber(phone);

        String cleanMessage = Normalizer.normalize(message, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .replaceAll("[\\r\\n]+", " ")
                .trim();

        String url = API_URL +
                "?sub_account=" + SUB_ACCOUNT +
                "&sub_account_pass=" + SUB_ACCOUNT_PASS +
                "&action=send_sms" +
                "&sender_id=" + SENDER_ID +
                "&message=" + cleanMessage +
                "&recipients=" + formattedPhone;

        try {
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("SMS sent to " + formattedPhone + ". Response: " + response);
        } catch (Exception e) {
            System.err.println("Failed to send SMS: " + e.getMessage());
        }
    }

    private String formatPhoneNumber(String phone) {
        if (phone.startsWith("0")) {
            return "+212" + phone.substring(1);
        }
        return phone;
    }
}
