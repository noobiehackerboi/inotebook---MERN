const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1: fetching all notes from auth-token
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occured");
    }
});

// ROUTE 2: adding new note from auth-token. Login required
router.post('/addnote', fetchuser, [
    body('title', "Enter valid title").isLength({ min: 3 }),
    body('description', "Enter a valid description").isLength({ min: 5 })
], async (req, res) => {

    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        note.save();
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occured");
    }
});

// ROUTE 3: updating note from auth-token. Login required
router.put('/updatenote/:id', fetchuser, [
    body('title', "Enter valid title").isLength({ min: 3 }),
    body('description', "Enter a valid description").isLength({ min: 5 })
], async (req, res) => {

    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occured");
    }
});
// ROUTE 4: Deleting note from auth-token. Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occured");
    }
});

module.exports = router;