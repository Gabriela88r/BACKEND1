import express from "express";
import { createUser } from "../config/createUser.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const user = await createUser(username, password);
    return res.status(201).json({ message: "Usuario creado", user: { username: user.username, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: "Error creando usuario", error: err.message });
  }
});

export default router;
