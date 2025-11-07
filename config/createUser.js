// db.js
import mongoose from 'mongoose';
import 'dotenv/config'; // Carga las variables de entorno desde .env


const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Conectado a MongoDB');
    } catch (error) {
        console.error('❌ Error al conectar Mongo:', error);
        process.exit(1); // Termina el proceso si no hay conexión
    }
};

export default conectarDB;
