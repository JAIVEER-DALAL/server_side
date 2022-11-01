const config = require('dotenv').config()
const cors = require('cors')
const express = require('express')

const healthRouter = require("./routes/health")
const notesRouter = require("./routes/notes")
const noteRouter = require("./routes/note")

if (config.error) {
  throw config.error
}

const port = process.env.PORT // || 3001
global.port = port

const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
  TODO-1: Settup Database connection
*/

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.


const bodyParser = require('body-parser');
const mysql = require('mysql');


const db = mysql.createConnection ({
    host: 'localhost',
    user: 'jai',
    password: 'zxcvb',
    database: 'Notes'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }

    var sql = `create table if not exists jaiveer (
      id int(10) not null auto_increment ,
      text varchar(250)  not null,
      dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      lastModified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1`;

    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table is created successfully");
    });

    console.log('database has been connected successfully');
});
global.db = db;

/*
  TODO-2: Upon database connection success, create the relavent table(s) if it does not exist.
*/

app.set('port', process.env.port || port);
app.set('view engine', 'ejs'); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('CSBC1010 Assignment 3 - My Notes')
})

app.use("/health", healthRouter)
app.use("/notes", notesRouter)
app.use("/note", noteRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})