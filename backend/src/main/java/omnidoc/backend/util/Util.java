package omnidoc.backend.util;

public class Util {
    public static String parseBooleanString(Boolean bool) throws Exception {
        int value = bool ? 1 : 0;
        return AESUtil.encrypt(String.valueOf(value));
    }

    public static String decryptIfNotNull(String encryptedValue) throws Exception {
        return encryptedValue != null ? AESUtil.decrypt(encryptedValue) : null;
    }

    public static String encryptIfNotNull(String value) throws Exception {
        return value != null ? AESUtil.encrypt(value) : null;
    }


    public static Boolean parseStringToBoolean(String encrypted) throws Exception {
        int value = Integer.parseInt(AESUtil.decrypt(encrypted));
        if (value == 1) {
            return true;
        } else if (value == 0) {
            return false;
        } else {
            return null;
        }
    }

}
