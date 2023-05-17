from flask import Flask , render_template , redirect , url_for , request , session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager , UserMixin , login_user , logout_user , current_user
import cx_Oracle
from datetime import datetime
import random
from Functions import send_mail , getDiff
import bcrypt


# oracle connection 
try:
    connection = cx_Oracle.connect("username/Password@localhost:1521/orcl")
except Exception as err:
        print("Error while trying to connect to Database.")
else:
    cur = connection.cursor()
    print("Successfully connected to oracle Database")


# instances of an application 
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "oracle+cx_oracle://username:Password@localhost:1521/orcl"
app.config['SECRET_KEY'] = 'myUniqueSecretKey'

salt = bcrypt.gensalt()

db = SQLAlchemy(app)

class myUsers(db.Model,UserMixin):

    id = db.Column(db.Integer,primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(255),unique=True)
    password = db.Column(db.String(255))
    verification_code = db.Column(db.Integer)
    account_create_date = db.Column(db.DateTime)
    v_create_date = db.Column(db.DateTime)
    verified = db.Column(db.String(25))
    

# Argumnet Constructor 
    def __init__(self,id,first_name,last_name,
                 email,password,verification_code,
                 account_create_date,v_create_date,
                 verified):

        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.verification_code = verification_code
        self.account_create_date = account_create_date
        self.v_create_date = v_create_date
        self.verified = verified

# getter method
    def get_info(self):
        print(f"""
        First name: {self.first_name}S
        Last name: {self.last_name}
        Email: {self.email}
        password: {self.password}
        time: {self.v_create_time}
        Verify Check: {self.verified}
        """)
    

# Flask login manager installation

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return myUsers.query.get(user_id)

# Session protection

app.config['SESSION_PROTECTION'] = 'strong'


# route is using for specific purpose             


@app.route("/",methods=['POST','GET'])
def loginPage():

    # login Session properties .

    if "logged" in session:
        return redirect(url_for("profile"))

    if request.method == 'POST':
        email = request.form['email']
        user_password = request.form['password']
        user_password = user_password.encode('utf-8')
        user = myUsers.query.filter_by(email=email).first()
        if user:
            if bcrypt.checkpw(user_password,user.password.encode('utf-8')):
                login_user(user)
                if user.verified == "Verified":
                    session["logged"] = ""
                    return redirect(url_for("profile"))
                else:
                    session["verify"] = ""
                    return redirect(url_for("verify"))
            else:
                session["invalidLogin"] = ""
                return redirect(url_for("loginPage"))
        else:
            session["invalidLogin"] = ""
            return redirect(url_for("loginPage"))

    else:
        return render_template("index.html",css="css/style.css",javaScript="js/login.js")


# Register page

@app.route("/register",methods=['POST','GET'])
def register():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        password = request.form['password']
        password = password.encode('utf-8')
        password = bcrypt.hashpw(password,salt)
        password = password.decode('utf-8')
        v_code = random.randint(1000000,9999999)

        #check if email exsited

        user = myUsers.query.filter_by(email=email).first()
        if user:
            session["exsist"] = ""
            return redirect(url_for("loginPage"))
        else:
            # Checking for Users in table .
            sql = "SELECT * FROM MY_USERS ORDER BY ID"
            cur.execute(sql)
            table = cur.fetchall()
            if table:
                new_user_id = table[len(table) - 1][0] + 1
                new_user = myUsers(new_user_id,
                                   first_name,
                                   last_name,
                                   email,
                                   password,
                                   v_code,
                                   datetime.now(),
                                   datetime.now(),
                                   "Not verified")
                
                with app.app_context():   #add to database
                    db.session.add(new_user)
                    db.session.commit()
                    user = myUsers.query.filter_by(email=email).first()
                    send_mail(email,v_code)
                    login_user(user)


                session["verify"] = ""
                return redirect(url_for("verify"))
            else:
                # if There's not users already , Setting id  = 1
                new_user = myUsers(1,
                                   first_name,
                                   last_name,
                                   email,
                                   password,
                                   v_code,
                                   datetime.now(),
                                   datetime.now(),
                                   "Not verified")
                with app.app_context():
                    db.session.add(new_user)
                    db.session.commit()
                    user = myUsers.query.filter_by(email=email).first()
                    send_mail(email,v_code)
                    login_user(user)

        
                session["verify"] = ""
                return redirect(url_for("verify"))

    else:
        # Keeping user in Register page until user making a post request
        return render_template("register.html",css="css/register.css",javaScript="js/register.js")





@app.route("/verify",methods=['POST','GET'])
def verify():
    # if user have access to verify page 
    if "verify" in session:
        user = myUsers.query.filter_by(email=current_user.email).first()
        # checking  if verification code is valid 
        if getDiff(user.v_create_date) < 10:
            pass
        # sending new verification code
        else:
            new_vcode = random.randint(1000000,9999999)
            user.verification_code = new_vcode
            user.v_create_date = datetime.now()
            db.session.commit()
            send_mail(user.email,user.verification_code)

        if request.method == 'POST':
            user_vc = request.form['userVC']
            if user_vc == str(user.verification_code):
                user.verified = 'Verified'
                db.session.commit()
                session["created"] = ""
                with app.app_context():
                    logout_user()
                    session.pop("verify",None)
                # if verification code is valid redirect to login page
                return redirect(url_for("loginPage"))
            else:
                # if verification code is not valid refreshing the page 
                session["invalidVC"] = ""
                return redirect(url_for("verify"))
        else:
             return render_template("verify.html",css="css/verify.css")
    else:
        return redirect(url_for("loginPage"))
  


@app.route("/profile")
def profile():
    if "logged" in session:
        return render_template("profile.html",css="css/profile.css")
    else :
        return redirect(url_for('loginPage'))


@app.route("/logout")
def logout():
    logout_user()
    session.pop("logged",None)
    return redirect(url_for("loginPage"))



if __name__ == "__main__":
    app.run(debug=True,port=8000)