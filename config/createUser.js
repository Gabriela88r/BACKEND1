import User from "../models/User.js";
import bcrypt from "bcryptjs";

/**
 * Crea un usuario en la base de datos si no existe.
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña en texto plano
 * @param {string} role - Rol del usuario (opcional, por defecto "user")
 */
export async function createUser(username, password, role = "user") {
  try {
    // Verificar si ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`⚡ Usuario "${username}" ya existe`);
      return existingUser; // Devuelve el usuario existente
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    console.log(`✅ Usuario "${username}" creado con éxito`);
    return newUser;

  } catch (err) {
    console.error("❌ Error creando usuario:", err);
    throw err; // Para que el llamador pueda manejar el error
  }
}
