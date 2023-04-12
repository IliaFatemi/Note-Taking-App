const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const {Pool} = require('pg');

const PORT = 3000; // port number
const HOST = "0.0.0.0" // host IP
const ANGULAR_PROJECT_DIR = path.join(__dirname, 'dist/frontend/')
console.log(ANGULAR_PROJECT_DIR)
const app = express()
const pool = new Pool({
  user:'postgres',
  password:'root',
  host:'db'
})
const corsOptions = {
    origin: 'http://localhost:4200', // Allow only this origin to access the API
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow only these HTTP methods
    allowedHeaders: ['Content-Type'], // Allow only these headers
    // credentials: true
}; // CORS settings

app.use(cors(corsOptions)); // CORS setup
app.use(express.static(ANGULAR_PROJECT_DIR))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// Angular project
app.get("/", (req, res) => {
  res.sendFile(ANGULAR_PROJECT_DIR+"index.html")
})

app.get('/base', async(req, res)=>{
  try{
    await pool.query('CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, noteBody TEXT NOT NULL, timeLastModified TIMESTAMP NOT NULL, createdOn TIMESTAMP NOT NULL DEFAULT now())')
    res.send("Success!!!")
  }catch (e){
    res.send(e)
  }
})

app.get('/showNotes', async(req, res)=>{
  result = await pool.query(`SELECT * FROM notes ORDER BY createdon ASC;`)
  for(var i = 0; i < result.rows.length; i++){
    var modified_date = result.rows[i].timelastmodified.toString().split(' ').splice(0, 5)
    var date_created = result.rows[i].createdon.toString().split(' ').splice(0, 5)
    var new_mod_date = `${modified_date[0]} ${modified_date[1]} ${modified_date[2]}, ${modified_date[3]} at ${modified_date[4]}`
    var new_date = `${date_created[0]} ${date_created[1]} ${date_created[2]}, ${date_created[3]} at ${date_created[4]}`
    result.rows[i].createdon = new_date
    result.rows[i].timelastmodified = new_mod_date   
  }
  res.send(result.rows)
})

app.delete('/deleteNote/:id', async(req, res)=>{
  sql = `DELETE FROM notes WHERE id=$1`
  result = await pool.query(sql, [req.params.id])
  res.send(`Deleted ${req.params.id}`)
})

app.post('/addNote', (req, res)=>{
  const {title, notebody} = req.body
  sql = `INSERT INTO notes (title, noteBody, timeLastModified) VALUES ($1, $2, NOW());`
  const statement = {
    name: 'insert_note',
    text: sql,
    values:[title, notebody]
  }
  pool.query(statement, (err, resp)=>{
    if(err){
      console.error(err)
    }else{
      console.log(resp)
    }
  })
  res.send("Added Note")
})

app.put('/updateNote/', (req, res)=>{
  const {id, title, notebody} = req.body
  sql = `UPDATE notes SET title = $1, noteBody = $2, timeLastModified = NOW() WHERE id = $3`
  pool.query(sql, [title, notebody, id], (err, result)=>{
    if(err){
      console.error(err);
      res.status(500).send('Internal server error');
    }else{
      res.send('Note updated successfully');
      return
    }
  })
})

app.listen(PORT, HOST, () => {
    console.log(`Server started on host ${HOST} and  port ${PORT}`);
  });