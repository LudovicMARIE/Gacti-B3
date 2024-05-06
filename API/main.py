import mysql.connector
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

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

# Example endpoint to fetch data
@app.get("/comptes/")
def read_items(db=Depends(get_db)):
    db.execute("SELECT * FROM compte")
    return db.fetchall()




@app.get("/login")
def login(username: str, password: str, db=Depends(get_db)):
    db.execute("SELECT COUNT(*),TYPEPROFIL,NOMCOMPTE,PRENOMCOMPTE,DATEINSCRIP, DATE_FORMAT(DATEINSCRIP,'%%d/%m/%Y') AS DATEINSCRIPFORMAT,DATEFERME,DATEDEBSEJOUR,DATE_FORMAT(DATEDEBSEJOUR,'%%d/%m/%Y') AS DATEDEBSEJOURFORMAT,DATEFINSEJOUR,DATE_FORMAT(DATEFINSEJOUR,'%%d/%m/%Y') AS DATEFINSEJOURFORMAT,DATENAISCOMPTE,DATE_FORMAT(DATENAISCOMPTE,'%%d/%m/%Y') AS DATENAISCOMPTEFORMAT,ADRMAILCOMPTE,NOTELCOMPTE FROM compte WHERE USER = %s and MDP = %s", (username, password))
    item = db.fetchone()
    if item is not None:
        return item
    raise HTTPException(status_code=404, detail="No user found")




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