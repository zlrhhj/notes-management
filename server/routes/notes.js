const express = require('express');
const Note = require('../../db/note');

const router = express.Router();

router.post('/notes', async (req, res) => {
  try {
    const note = new Note({
      ...req.body
    });

    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.query.user });
    if(!notes) {
      return res.status(404).send();
    }
    res.send(notes);
  } catch (error) {
    res.status(400).send();
  }
});

router.patch('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id},
      req.body,
      { new: true, runValidators: true }
    );
    if(!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id});
    if(!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;