import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();



connectDB()
  .then (() => {
    app.listen(PORT, () => {
      console.log('Listening on PORT:', PORT);
    });
  })

// Middleware add before routes
// Este middleware nos da acceso req.body que lo usaremos en el controller
app.use(express.json());
// Permite todas las peticiones
// app.use(cors())

// Podemos ser más específicos
// Si no lanzamos la aplición en producción...
if(process.env.NODE_ENV !== "production"){
app.use(cors({
  origin:"http://localhost:5173",
}))
}


app.use(rateLimiter);




// Middleware is a funciton that runs in the middle between the request and the response.
// Our simple middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
//   next();
// })

app.use('/api/notes', notesRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  });
};

