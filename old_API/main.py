import mysql.connector
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'gacti'
}

origins = [
    "http://localhost:8000",
    "http://localhost:4200",
    "http://localhost:80",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Establish a database connection
def get_db():
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)
    try:
        yield cursor
    finally:
        cursor.close()
        connection.close()
        
# Create an item
@app.post("/items/")
def create_item(name: str, description: str, db=Depends(get_db)):
    db.execute("INSERT INTO items (name, description) VALUES (%s, %s)", (name, description))
    db.connection.commit()
    return {"name": name, "description": description}

# Read an item
@app.get("/items/{item_id}")
def read_item(item_id: int, db=Depends(get_db)):
    db.execute("SELECT * FROM items WHERE id = %s", (item_id,))
    item = db.fetchone()
    if item is not None:
        return item
    raise HTTPException(status_code=404, detail="Item not found")

# Update an item
@app.put("/items/{item_id}")
def update_item(item_id: int, name: str, description: str, db=Depends(get_db)):
    db.execute("UPDATE items SET name = %s, description = %s WHERE id = %s", (name, description, item_id))
    db.connection.commit()
    return {"id": item_id, "name": name, "description": description}

# Delete an item
@app.delete("/items/{item_id}")
def delete_item(item_id: int, db=Depends(get_db)):
    db.execute("DELETE FROM items WHERE id = %s", (item_id,))
    db.connection.commit()
    return {"message": "Item deleted"}        




# login
@app.get("/login")
def login(username: str, password: str, db=Depends(get_db)):
    db.execute("SELECT COUNT(*),USER,TYPEPROFIL,NOMCOMPTE,PRENOMCOMPTE,DATEINSCRIP, DATE_FORMAT(DATEINSCRIP,'%%d/%m/%Y') AS DATEINSCRIPFORMAT,DATEFERME,DATEDEBSEJOUR,DATE_FORMAT(DATEDEBSEJOUR,'%%d/%m/%Y') AS DATEDEBSEJOURFORMAT,DATEFINSEJOUR,DATE_FORMAT(DATEFINSEJOUR,'%%d/%m/%Y') AS DATEFINSEJOURFORMAT,DATENAISCOMPTE,DATE_FORMAT(DATENAISCOMPTE,'%%d/%m/%Y') AS DATENAISCOMPTEFORMAT,ADRMAILCOMPTE,NOTELCOMPTE FROM compte WHERE USER = LOWER(%s) and MDP = SHA2(%s,256)", (username, password))
    item = db.fetchone()
    if item is not None:
        return item
    raise HTTPException(status_code=404, detail="No user found")

class SignupRequest(BaseModel):
    user: str
    mdp: str
    nomcompte: str
    prenomcompte: str
    datedebsejour: str
    datefinsejour: str
    datenaiscompte: str
    adrmailcompte: str
    notelcompte: str


# sign up
@app.post("/signup")
def login(signup_request: SignupRequest, db=Depends(get_db)):
    db.execute("INSERT INTO `compte` (`USER`, `MDP`, `NOMCOMPTE`, `PRENOMCOMPTE`, `DATEINSCRIP`, `DATEFERME`, `TYPEPROFIL`, `DATEDEBSEJOUR`, `DATEFINSEJOUR`, `DATENAISCOMPTE`, `ADRMAILCOMPTE`, `NOTELCOMPTE`) VALUES (%s, SHA2('%s',256), %s, %s, CURDATE(), NULL, '2', %s, %s, %s, %s, %s)", (signup_request.user, signup_request.mdp, signup_request.nomcompte, signup_request.prenomcompte, signup_request.datedebsejour, signup_request.datefinsejour, signup_request.datenaiscompte, signup_request.adrmailcompte, signup_request.notelcompte))
    db._connection.commit()
    return { "message": "Signup successful" }


# get all activities
@app.get("/activities")
def activity(db=Depends(get_db)):
    db.execute("SELECT AN.CODEANIM,DATEACT, `CODEETATACT`, `HRRDVACT`, `PRIXACT`, `HRDEBUTACT`, `HRFINACT`, `DATEANNULEACT`, `NOMRESP`, `PRENOMRESP`, `NOMANIM` FROM `activite` INNER JOIN animation AS AN ON activite.CODEANIM = AN.CODEANIM WHERE DATEACT>CURDATE() ORDER BY DATEACT")
    item = db.fetchall()
    if item is not None:
        return item
    raise HTTPException(status_code=404, detail="No activity found")






# get activity registered by user
@app.get("/activities/registered/{username}")
def activity(username: str, db=Depends(get_db)):
    db.execute("SELECT AN.CODEANIM, activite.DATEACT, `CODEETATACT`, `HRRDVACT`, `PRIXACT`, `HRDEBUTACT`, `HRFINACT`, `DATEANNULEACT`, `NOMRESP`, `PRENOMRESP`, `NOMANIM`, INS.NOINSCRIP, INS.USER, INS.CODEANIM, INS.DATEACT, INS.DATEINSCRIP, INS.DATEANNULE FROM `activite` INNER JOIN animation AS AN ON activite.CODEANIM = AN.CODEANIM INNER JOIN inscription AS INS ON activite.DATEACT = INS.DATEACT WHERE activite.DATEACT > CURDATE() AND INS.USER = %s ORDER BY activite.DATEACT",(username,))
    item = db.fetchall()
    if item is not None:
        return item
    raise HTTPException(status_code=404, detail="No activity found")


# get activities by type
@app.get("/activities/{codeanim}")
def activity(codeanim: str ,db=Depends(get_db)):
    db.execute("SELECT AN.CODEANIM,DATEACT, `CODEETATACT`, `HRRDVACT`, `PRIXACT`, `HRDEBUTACT`, `HRFINACT`, `DATEANNULEACT`, `NOMRESP`, `PRENOMRESP`, `NOMANIM` FROM `activite` INNER JOIN animation AS AN ON activite.CODEANIM = AN.CODEANIM WHERE DATEACT>CURDATE() AND AN.CODETYPEANIM = %s ORDER BY DATEACT", (codeanim,))
    item = db.fetchall()
    if item is not None:
        return item
    raise HTTPException(status_code=404, detail="No activity found")

# get animation types
@app.get("/animation-types")
def activity_type(db=Depends(get_db)):
    db.execute("SELECT CODETYPEANIM, NOMTYPEANIM FROM `type_anim` ORDER BY `CODETYPEANIM` ASC")
    item = db.fetchall()
    if item is not None:
        return item
    raise HTTPException(status_code=404, detail="No animation type found")





class RegisterActivityRequest(BaseModel):
    username: str
    codeanim: str
    dateact: str

# register activity
@app.post("/register-activity")
def register(request: RegisterActivityRequest,  db=Depends(get_db)):
    db.execute("SELECT COUNT(*),`USER`, `CODEANIM`, `DATEACT` FROM `inscription` WHERE `USER`=%s AND `CODEANIM`=%s AND `DATEACT`=%s", (request.username, request.codeanim, request.dateact))
    item = db.fetchone()
    if item['COUNT(*)'] > 0:
        raise HTTPException(status_code=403, detail="Activity already registered")
    db.execute("INSERT INTO `inscription`(`USER`, `CODEANIM`, `DATEACT`, `DATEINSCRIP`, `DATEANNULE`) VALUES (%s,%s,%s,CURDATE(),NULL)", (request.username, request.codeanim, request.dateact))
    db._connection.commit()
    return {"message": "Activity registered"}

# delete registration
@app.delete("/activities/registered/{number}")
def delete_registration(number: str, db=Depends(get_db)):
    db.execute("DELETE FROM `inscription` WHERE NOINSCRIP = %s", (number,))
    db._connection.commit()
    return {"message": "Registration deleted"}


# delete activity
@app.delete("/delete-activity/{codeanim}/{dateact}")
def delete_activity(codeanim: str, dateact: str, db=Depends(get_db)):
    db.execute("DELETE FROM `inscription` WHERE CODEANIM = %s AND DATEACT = %s", (codeanim, dateact))
    db._connection.commit()
    db.execute("DELETE FROM `activite` WHERE CODEANIM = %s AND DATEACT = %s", (codeanim, dateact))
    db._connection.commit()
    return {"message": "Activity deleted"}