package omnidoc.backend.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
public  class AESUtil {
    @Value("${SECRET_KEY}")
    public String SECRET_KEY;

    public String encrypt(String input) throws Exception {
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);

        if (keyBytes.length != 16 && keyBytes.length != 24 && keyBytes.length != 32) {
            throw new IllegalArgumentException("Invalid AES key length. Must be 16, 24, or 32 bytes.");
        }

        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        SecretKeySpec key = new SecretKeySpec(keyBytes, "AES"); // Use decoded bytes
        cipher.init(Cipher.ENCRYPT_MODE, key);

        byte[] encrypted = cipher.doFinal(input.getBytes("UTF-8")); // Explicit charset

        return Base64.getEncoder().encodeToString(encrypted);
    }
    public String decrypt(String encrypted) throws Exception {
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);

        if (keyBytes.length != 16 && keyBytes.length != 24 && keyBytes.length != 32) {
            throw new IllegalArgumentException("Invalid AES key length. Must be 16, 24, or 32 bytes.");
        }
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        SecretKeySpec key = new SecretKeySpec(keyBytes, "AES"); // Use decoded bytes
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] decoded = Base64.getDecoder().decode(encrypted);
        return new String(cipher.doFinal(decoded));
    }
}
