import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from datetime import datetime


def send_mail(email,verification_code):
    googleSecure_key = 'your_google_key'
    port = 465 
    context = ssl.create_default_context()

    email_sender = "your_email_address"
    email_reciever = email
    message = MIMEMultipart("alternative")
    message["Subject"] = "Verification message"
    message["From"] = "Demo Application"
    message["To"] = email_reciever
    htmlText =  f"""
                <html>
                <body style="background-color:white;width:100%;min-height:100vh;
                            text-align:center">

                    <div style=" color:white;margin:auto;background-color:black;width:600px;height:100%;text-align:left;">
                        <img style="vertical-align:bottom;margin-left:20px;margin-top:50px;" width="55px" src="https://cdn-icons-png.flaticon.com/512/3176/3176384.png">
                        <div style="width:100%;font-family:cursive;display:inline;font-size:17px">Demo application</div><br><br><br><br>

                        <div style="text-align: center;font-size:30px;margin:0px;">Your Verification code
                            <br><div style="letter-spacing: 10px;font-family:fantasy"><span style="color:#10b6ed">{verification_code}</span></div>
                        </div><br><br><br><br><br>

                        <div style="margin-left:25px;margin-right:25px">This code is valid for 30 Minutes</div>
                        <div style="margin-left:25px;margin-right:25px;font-weight:700;color:#10b6ed">  <br><br>
                            Don’t know why you’re getting this email?<br></div>
                        <div style="margin-left:25px;margin-right:25px;"><p>We sent this email to help you log in to your Demo account.<br><br>
                                
                        If you didn’t try to log in to your account or request this email<br>
                        don’t worry, your email address may have been entered by mistake.<br>
                        You can simply ignore or delete this email, and use your existing<br> password to log in.<br><br><br>
                            
                        Happy listening!<br><br>

                        The team at Demo
                </p></div><br><br>

                    </div>
                </body>
                </html>

                """
    part1 = MIMEText(htmlText,"html")

    message.attach(part1)

    message.attach(MIMEText(htmlText, "html"))

    
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
            server.login(email_sender,googleSecure_key)
            server.sendmail(email_sender,email_reciever,message.as_string())
    except Exception as err:
        print("Failed to send email")
    else:
        print("Email sent successfully !")


def getDiff(user_time):
    str_format = "%d/%m/%Y %H:%M:%S.%f"

    user_time = user_time.strftime(str_format)
    user_time = str(user_time)

    now = datetime.now()
    now = now.strftime(str_format)
    now= str(now)


    start = datetime.strptime(user_time,str_format)
    end = datetime.strptime(now,str_format)

    diff = end - start

    diff = diff.total_seconds() / 60
    return diff

