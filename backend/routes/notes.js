const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');

// ROUTE 1: fetching all notes from auth-token. Login required
router.post('/fetchallnotes', fetchuser, async (req, res) => {
    let success = true;
    try {
        // Finding all notes by user from auth-token
        const notes = await Notes.find({ user: req.user.id });
        res.json({ success, notes });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: adding new note from auth-token. Login required
router.post('/addnote', fetchuser, [
    body('title', "Enter valid title").isLength({ min: 3 }),
    body('description', "Enter a valid description").isLength({ min: 5 })
], async (req, res) => {

    let success = false;
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ success, errors: result.array() });
        }

        // Pushing new note for user from auth-token
        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        note.save();
        success = true;
        res.json({ success, note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal Server Error");
    }
});

// ROUTE 3: updating note from auth-token. Login required
router.put('/updatenote/:id', fetchuser, [
    body('title', "Enter valid title").isLength({ min: 3 }),
    body('description', "Enter a valid description").isLength({ min: 5 })
], async (req, res) => {

    let success = false;
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ success, errors: result.array() });
        }

        // creating new Note from new parameters
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        // Find which note to be updated (using noteId)
        // params function get id from URL
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).json({ success, error: "Not Found" }); }

        // If creator of note doesn't matches with the one editing it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success, error: "Not Allowed" });
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        success = true;
        res.json({ success, note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal Server Error");
    }
});
// ROUTE 4: Deleting note from auth-token. Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    let success = false;
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ success, errors: result.array() });
        }

        // finding which note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send({ success, error: "Not Found" }); }

        // If creator of note doesn't matches with the one deleting it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ success, error: "Not Allowed" });
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        success = true;
        res.json({ success, note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal Server Error");
    }
});

module.exports = router;