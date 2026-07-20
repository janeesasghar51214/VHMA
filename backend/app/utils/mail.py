import os
import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_otp_email(email: str, otp: str) -> bool:
    """
    Sends an OTP email for password reset.
    If SMTP settings are missing or send fails, it prints the OTP to console (for local development).
    """
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = os.getenv("SMTP_PORT")
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    smtp_sender = os.getenv("SMTP_SENDER", smtp_username or "noreply@vmha.com")

    subject = "VMHA - Password Reset OTP"
    body = f"""
    Hello,

    We received a request to reset your password for your Virtual Mental Health Assistant (VMHA) account.
    Your One-Time Password (OTP) is:

    ==================================
                 {otp}
    ==================================

    This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email.

    Best regards,
    The VMHA Team
    """

    # Local development logging fallback check
    if not all([smtp_host, smtp_port, smtp_username, smtp_password]):
        print("\n" + "="*50, file=sys.stderr)
        print(f"[LOCAL DEV] Password reset OTP for {email}: {otp}", file=sys.stderr)
        print("="*50 + "\n", file=sys.stderr)
        return True

    try:
        port = int(smtp_port)
        msg = MIMEMultipart()
        msg["From"] = smtp_sender
        msg["To"] = email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        # Setup connection
        server = smtplib.SMTP(smtp_host, port)
        server.ehlo()
        if port == 587:
            server.starttls()
            server.ehlo()
        server.login(smtp_username, smtp_password)
        server.sendmail(smtp_sender, email, msg.as_string())
        server.close()
        
        print(f"[SUCCESS] Sent OTP email to {email}")
        return True
    except Exception as e:
        print(f"[WARNING] Failed to send email via SMTP: {e}", file=sys.stderr)
        print("\n" + "="*50, file=sys.stderr)
        print(f"[FALLBACK LOG] Password reset OTP for {email}: {otp}", file=sys.stderr)
        print("="*50 + "\n", file=sys.stderr)
        return True
