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
        
        


# Example endpoint to fetch data
@app.get("/comptes/")
def read_items(db=Depends(get_db)):
    db.execute("SELECT * FROM compte")
    return db.fetchall()



# login endpoint
@app.get("/login")
def login(username: str, password: str, db=Depends(get_db)):
    db.execute("SELECT COUNT(*),TYPEPROFIL,NOMCOMPTE,PRENOMCOMPTE,DATEINSCRIP, DATE_FORMAT(DATEINSCRIP,'%%d/%m/%Y') AS DATEINSCRIPFORMAT,DATEFERME,DATEDEBSEJOUR,DATE_FORMAT(DATEDEBSEJOUR,'%%d/%m/%Y') AS DATEDEBSEJOURFORMAT,DATEFINSEJOUR,DATE_FORMAT(DATEFINSEJOUR,'%%d/%m/%Y') AS DATEFINSEJOURFORMAT,DATENAISCOMPTE,DATE_FORMAT(DATENAISCOMPTE,'%%d/%m/%Y') AS DATENAISCOMPTEFORMAT,ADRMAILCOMPTE,NOTELCOMPTE FROM compte WHERE USER = %s and MDP = %s", (username, password))
    item = db.fetchone()
    if item is not None:
        return item
    raise HTTPException(status_code=404, detail="No user found")

# activities endpoint
@app.get("/activities")
def activity(db=Depends(get_db)):
    db.execute("SELECT AN.CODEANIM,DATEACT, `CODEETATACT`, `HRRDVACT`, `PRIXACT`, `HRDEBUTACT`, `HRFINACT`, `DATEANNULEACT`, `NOMRESP`, `PRENOMRESP`, `NOMANIM` FROM `activite` INNER JOIN animation AS AN ON activite.CODEANIM = AN.CODEANIM WHERE DATEACT>CURDATE() ORDER BY DATEACT")
    item = db.fetchall()
    if item is not None:
        return item
    raise HTTPException(status_code=404, detail="No activity found")

# activity endpoint
@app.get("/activity/{codeanim}")
def activity(codeanim: str ,db=Depends(get_db)):
    db.execute("SELECT AN.CODEANIM,DATEACT, `CODEETATACT`, `HRRDVACT`, `PRIXACT`, `HRDEBUTACT`, `HRFINACT`, `DATEANNULEACT`, `NOMRESP`, `PRENOMRESP`, `NOMANIM` FROM `activite` INNER JOIN animation AS AN ON activite.CODEANIM = AN.CODEANIM WHERE DATEACT>CURDATE() AND AN.CODETYPEANIM = %s ORDER BY DATEACT", (codeanim,))
    item = db.fetchall()
    if item is not None:
        return item
    raise HTTPException(status_code=404, detail="No activity found")

# animation type getter
@app.get("/animationType")
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

# activity register
@app.post("/registerActivity")
def register(request: RegisterActivityRequest,  db=Depends(get_db)):
    db.execute("SELECT COUNT(*),`USER`, `CODEANIM`, `DATEACT` FROM `inscription` WHERE `USER`=%s AND `CODEANIM`=%s AND `DATEACT`=%s", (request.username, request.codeanim, request.dateact))
    item = db.fetchone()
    if item['COUNT(*)'] > 0:
        raise HTTPException(status_code=403, detail="Activity already registered")
    db.execute("INSERT INTO `inscription`(`USER`, `CODEANIM`, `DATEACT`, `DATEINSCRIP`, `DATEANNULE`) VALUES (%s,%s,%s,CURDATE(),NULL)", (request.username, request.codeanim, request.dateact))
    db._connection.commit()
    return {"message": "Activity registered"}