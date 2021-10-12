const express = require('express');
const path = require('path');
const app = express();
const notes = require('./routes/notes-router');

app.use(express.json());

app.use('/notes', notes);

app.use(express.static(path.resolve(__dirname, '../client/')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server has been started');
});
