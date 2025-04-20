// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Middleware CORS : autoriser uniquement le frontend local
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Middleware pour parser le JSON
app.use(express.json());

// Exemple de base de données temporaire (à remplacer plus tard par une vraie DB)
let events = [
  { id: 1, title: 'DJ Set Nantes', date: '2025-06-01' },
  { id: 2, title: 'Freelance Mission Web', date: '2025-06-05' }
];

// ROUTES

// GET all events
app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
    const { title, date, location } = req.body;
    const newEvent = {
      id: Date.now().toString(),
      title,
      date,
      location,
    };
    events.push(newEvent);
    res.status(201).json(newEvent);
  });
  
// Modifier un événement
app.put('/api/events/:id', (req, res) => {
    const { id } = req.params;
    const { title, date, location, type, status } = req.body;

    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex === -1) return res.status(404).json({ message: 'Événement non trouvé' });

    events[eventIndex] = { ...events[eventIndex], title, date, location, type, status };
    res.json(events[eventIndex]);
});

// Supprimer un événement
app.delete('/api/events/:id', (req, res) => {
    const { id } = req.params;
    events = events.filter(e => e.id !== id);
    res.status(204).end();
});
// Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});
