// src/config.ts

const isDev = import.meta.env.DEV;

export const API_BASE_URL = isDev
  ? 'http://localhost:4000/api' // Pour le développement local
  : 'https://ton-backend-deployé.netlify.app/api'; // À adapter pour la prod
