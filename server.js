import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

// Conexión a MongoDB
conectarDB().catch((error) => {
  console.error('❌ Error al conectar a MongoDB:', error.message);
  process.exit(1); // Detiene el servidor si no conecta
});

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Middleware para manejar errores (global)
app.use((err, req, res, next) => {
  console.error('🔥 Error del servidor:', err.stack);
  res.status(err.status || 500).json({
    ok: false,
    message: err.message || 'Error interno del servidor',
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
