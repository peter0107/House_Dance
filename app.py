from flask import render_template, request, Flask, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# DB connection(mysql in AWS)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:peter0107@database-1.cc0lokhfxaeb.us-east-2.rds.amazonaws.com/software_database'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config["SECRET_KEY"]="ABCD"

# SQLAlchemy
db = SQLAlchemy(app)

# DB class definition
class house_user(db.Model):
    nickname = db.Column(db.String(20), primary_key=True)
    password = db.Column(db.String(60), nullable=False)
    

#default
user_authenticated=False

#user register
@app.route('/register', methods=['POST'])
def register():
    nickname=request.form.get('nickname')
    password=request.form.get('password')
    new_user=house_user(nickname=nickname,password=password)
    db.session.add(new_user)
    db.session.commit()
    return render_template('index.html',user_authenticated=False)
    
    
    
#user login
@app.route('/login', methods=['POST'])
def login():
    global user_authenticated
    nickname=request.form.get('nickname')
    password=request.form.get('password')

    #check whether there are same nickname in DB
    existing_user = house_user.query.filter_by(nickname=nickname).first()
    

    if existing_user is None:
        flash("login failed")
        return render_template('index.html',user_authenticated=False)
    else:
        if existing_user.password==password:
            return render_template('index.html',user_authenticated=True,user_nickname=nickname)
        else:
            flash("login failed")
        return render_template('index.html',user_authenticated=False)
        

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    
    
    app.run(debug=True)
