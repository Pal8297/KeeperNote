const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser")
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');

//Route:1 Get all notes using: Get "/api/auth/fetchallnotes".login require
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.send(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


//Route:2 Add a new note using: POST "/api/notes/addnote".login require
router.post("/addnote", fetchUser,
    [body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 character').isLength({ min: 5 }),
    ], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and errors
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save()
            res.json(saveNote)
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    })


//Route:3 Update an existing note using: PUT "/api/notes/updatenote".login require
router.put("/updatenote/:id", fetchUser, async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //Create a newNote object
            console.log(title, description, tag)
            const newNote = {};
            if(title){newNote.title = title};
            if(description){newNote.description = description};
            if(tag){newNote.tag = tag};

            //find  the note to br updated and update it
            let note  = await Note.findById(req.params.id);
            if(!note){return res.status(404).send("Not Found")}

            //The note.user field represents the user who created the note in the database.
            //Since note.user is an ObjectId, we convert it to a string using the toString() 
            //method.
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed")
            }

            note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
            res.json({note});

        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    })


//Route:4 Delete an existing note using: DELETE "/api/notes/deletenote".login require
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {
        //find  the note to br updated and update it
        let note  = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        //The note.user field represents the user who created the note in the database.
        //Since note.user is an ObjectId, we convert it to a string using the toString() 
        //method.
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Sucess": "Note has been deleted",note: note});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router