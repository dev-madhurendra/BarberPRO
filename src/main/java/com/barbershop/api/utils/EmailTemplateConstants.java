package com.barbershop.api.utils;

public interface EmailTemplateConstants {

    String YOUR_OTP_VERIFICATION = "Your OTP for Barber Shop Verification";
    String HTML_EMAIL_TEMPLATE = """
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #214C3C; text-align: center;">Barber Shop Verification</h2>
        <p style="font-size: 16px; color: #333;">Dear User,</p>
        <p style="font-size: 16px; color: #333;">Your OTP for verification is:</p>
        
        <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; color: #214C3C; background-color: #f1f1f1; padding: 10px 20px; border-radius: 6px;">%s</span>
        </div>
        
        <p style="font-size: 14px; color: #555;">This OTP is valid for <strong>10 minutes</strong>.</p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eaeaea;">
        
        <p style="font-size: 14px; color: #555;">If you did not request this, please ignore this email.</p>
        <p style="font-size: 14px; color: #555;">Thank you,<br>Barber Shop Team</p>
    </div>
    """;

}
