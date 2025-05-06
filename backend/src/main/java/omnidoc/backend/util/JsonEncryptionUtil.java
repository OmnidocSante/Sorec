package omnidoc.backend.util;


import java.util.HashMap;
import java.util.Map;

import static omnidoc.backend.util.AESUtil.decrypt;
import static omnidoc.backend.util.AESUtil.encrypt;


public class JsonEncryptionUtil {
    public static Map<String, String> encryptMapValues(Map<String, String> inputMap) throws Exception {
        Map<String, String> encryptedMap = new HashMap<>();
        for (Map.Entry<String, String> entry : inputMap.entrySet()) {
            encryptedMap.put(entry.getKey(), encrypt(entry.getValue()));
        }
        return encryptedMap;
    }

    public static Map<String, String> decryptMapValues(Map<String, String> encryptedMap) throws Exception {
        Map<String, String> decryptedMap = new HashMap<>();
        for (Map.Entry<String, String> entry : encryptedMap.entrySet()) {
            decryptedMap.put(entry.getKey(), decrypt(entry.getValue()));
        }
        return decryptedMap;
    }

}
