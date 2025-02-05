import cors from 'cors';

// Cette fonction configure et retourne un middleware CORS
export const corsOptions = cors({
  origin: 'http://localhost:5173', 
  methods: 'GET, POST', 
  allowedHeaders: 'Content-Type',
});