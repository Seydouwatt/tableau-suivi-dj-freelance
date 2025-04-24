const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// GET
app.get('/api/events', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erreur serveur');
    res.json(JSON.parse(data));
  });
});

// POST
app.post('/api/events', (req, res) => {
  const newEvent = req.body;

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erreur serveur');

    const events = JSON.parse(data);
    events.push(newEvent);

    fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2), (err) => {
      if (err) return res.status(500).send('Erreur serveur');
      res.status(201).json(newEvent);
    });
  });
});

// PUT
app.put('/api/events/:id', (req, res) => {
  const id = req.params.id;
  const updatedEvent = req.body;

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erreur serveur');

    let events = JSON.parse(data);
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return res.status(404).send('Événement non trouvé');

    events[index] = updatedEvent;

    fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2), (err) => {
      if (err) return res.status(500).send('Erreur serveur');
      res.json(updatedEvent);
    });
  });
});

// DELETE
app.delete('/api/events/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erreur serveur');

    let events = JSON.parse(data);
    const updatedEvents = events.filter(e => e.id !== id);

    fs.writeFile(DATA_FILE, JSON.stringify(updatedEvents, null, 2), (err) => {
      if (err) return res.status(500).send('Erreur serveur');
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
