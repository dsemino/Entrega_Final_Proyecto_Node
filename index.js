import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productsRouter from "./src/routes/product.router.js";
import authRoutes from './src/routes/auth.router.js';
import { db } from './src/config/firebase.js';


// Configurar variables de entorno
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());


app.use("/api/products", productsRouter);
app.use('/api/auth', authRoutes);

 app.get("/", (req, res) => {
     res.send(`
     <h1>API de Productos</h1>
     <p>Servidor funcionando correctamente</p>
   `);
 });


// Middleware para rutas desconocidas (404)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});


app.listen(PORT,() => console.log(`http://localhost:${PORT}`));