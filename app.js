const express = require('express');
const path = require('path');
const app = express();

let NOTES = [
  {
    time: '11:32:14 AM',
    text: 'Pick up children from school 10/8/2021',
    category: 'Task',
    dates: '10/8/2021',
    id: 0,
  },
  {
    time: '11:32:52 AM',
    text: 'Should i buy a Bitcoin? ',
    category: 'Random thought',
    dates: '-',
    id: 1,
  },
  {
    time: '11:33:12 AM',
    text: 'Wash dishes',
    category: 'Task',
    dates: '-',
    id: 2,
  },
  {
    time: '11:32:14 AM',
    text: 'Clean a car',
    category: 'Task',
    dates: '10/8/2021',
    id: 3,
  },
  {
    time: '11:32:52 AM',
    text: 'Create my own weather sity',
    category: 'Idea',
    dates: '-',
    id: 4,
  },
  {
    time: '11:33:12 AM',
    text: 'Should i buy a new house?',
    category: 'Random thought',
    dates: '-',
    id: 5,
  },
  {
    time: '11:33:12 AM',
    text: 'Go to the gym',
    category: 'Task',
    dates: '-',
    id: 6,
  },
];

let notesCounter = 7;

app.use(express.json());

//GET

// NEED : GET /api/notes/:id - retrieve item && GET /api/notes/stats

app.get('/api/notes', (req, res) => {
  res.status(200).json(NOTES);
});

//POST

app.post('/api/notes', (req, res) => {
  const note = { ...req.body, id: notesCounter };
  NOTES.push(note);
  notesCounter = NOTES.length;
  res.status(201).json(note);
});

//DELETE
app.delete('/api/notes/:id', (req, res) => {
  // NOTES = [...NOTES.slice(0, +req.params.id), ...NOTES.slice(+req.params.id + 1)];
  NOTES = NOTES.filter((item) => item.id !== req.params.id);
  notesCounter = NOTES.length;
  res.status(200).json({ message: `note ${req.params.id} was deleted` });
});

//smth

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server has been started');
});
