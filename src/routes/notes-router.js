const express = require('express');
let NOTES = require('../repositories/notes');
let notesCounter = require('../repositories/notesCounter');
const countNotes = require('../helpers/countNotes');
const getDates = require('../helpers/getDates');
let router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(NOTES);
});

router.get('/stats', (req, res) => {
  let COUNTERS = countNotes(NOTES);
  res.status(200).json(COUNTERS);
});

router.get('/:id', (req, res) => {
  if (req.params.id >= notesCounter) {
    res.status(400).json('wrong id');
  } else {
    res.status(200).json(NOTES[req.params.id]);
  }
});

router.post('', (req, res) => {
  const note = { ...req.body, id: notesCounter };
  NOTES.push(note);
  notesCounter = NOTES.length;
  res.status(201).json(note);
});

router.delete('/:id', (req, res) => {
  NOTES = NOTES.filter((item) => item.id !== +req.params.id);
  NOTES.forEach((item) => {
    if (item.id >= req.params.id) {
      item.id--;
    }
  });
  notesCounter = NOTES.length;
  res.status(200).json({ message: `note ${req.params.id} was deleted` });
});

router.patch('/:id', (req, res) => {
  let dates = getDates(req.body.text);
  let time = new Date().toLocaleTimeString();
  NOTES[+req.params.id].text = req.body.text;
  NOTES[+req.params.id].time = time;
  NOTES[+req.params.id].dates = dates;
  res.status(200).json({ message: `item ${req.params.id} edited f2` });
});

module.exports = router;
