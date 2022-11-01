const express = require('express')
const router = express.Router()
const { validateNoteArray } = require('../utils/validators')

/* ------------------------ TODO-3 - Fetch All Notes ------------------------ */
router.get('/', async (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes - Fetching all notes`)

 /* 
    TODO-3:
  */
   // Your code here...

       var notes = [];
  let query = "select * from jaiveer order by id ASC";
  

  await db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send('Fail to query');
    }
  
  
    notes = result;
    if (!validateNoteArray(notes)) {
      return res.status(500).send('Invalid data type')
    }
    return res.send({ notes })
  });


})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-7 - Search Notes -------------------------- */
router.get('/search/:searchKey', async (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes/search - Searching notes`)

  /*
    TODO-7:
      Given a search key
      Fetch all notes from the database that contains the search key in the note content
      Return an array of matching note objects

      Search key is sotred in variable searchKey

      Your notes object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
  const searchKey = req.params.searchKey
  console.log(searchKey)



  // Your code here...

  var notes = [];

  const searchNoteQuery = `select * from jaiveer where text like '%${searchKey}%'`


    await db.query(searchNoteQuery, (err, result) => {
    if (err) {
      return res.status(500).send('Fail to query')

    }
    notes = result;
    if (!validateNoteArray(notes)) {
      return res.status(500).send('Invalid data type')
    }
    return res.send({ notes })
  });

})
/* -------------------------------------------------------------------------- */

/* ----------------------- TODO-8 - Delete All Notes ------------------------ */
router.delete('/', async (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/notes - Deleting all notes`)

  /*
    TODO-8:
      Delete all notes from the database
  */

      const deleteAllQuery = `delete from jaiveer`;

    await db.query(deleteAllQuery, (err, result) => {
    if (err) {
    
      return res.status(500).send('Fail to delete')

    }

    return res.send()
  });


})
/* -------------------------------------------------------------------------- */

module.exports = router