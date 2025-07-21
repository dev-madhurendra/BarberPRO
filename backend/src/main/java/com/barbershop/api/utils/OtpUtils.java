package com.barbershop.api.utils;

import java.util.Random;

public class OtpUtils {

    public static String generateOtp() {
        int otp = 100_000 + new Random().nextInt(900_000);
        return String.valueOf(otp);
    }

}
