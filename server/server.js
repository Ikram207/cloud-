require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI =", MONGO_URI);

// Middleware pour autoriser CORS (cross-origin requests)
app.use(cors());

// Middleware pour parser le JSON dans le corps des requêtes
app.use(express.json());

// Modèle Mongoose User
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
const User = mongoose.model("User", userSchema);

// Route GET /users : récupérer tous les utilisateurs
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Erreur lors de la récupération :", err);
    res.status(500).json({ error: "Erreur serveur interne" });
  }
});

// Route POST /users : ajouter un utilisateur
app.post("/users", async (req, res) => {
  const { name, age, favoriteFoods } = req.body;

  // Validation simple
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Le champ 'name' est obligatoire et doit être une chaîne" });
  }
  if (age !== undefined && typeof age !== "number") {
    return res.status(400).json({ error: "Le champ 'age' doit être un nombre" });
  }
  if (favoriteFoods !== undefined && !Array.isArray(favoriteFoods)) {
    return res.status(400).json({ error: "Le champ 'favoriteFoods' doit être un tableau" });
  }

  try {
    const newUser = new User({ name, age, favoriteFoods });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Erreur lors de la sauvegarde :", err);
    res.status(500).json({ error: "Erreur serveur interne" });
  }
});

// Connexion à MongoDB puis démarrage du serveur
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connexion à MongoDB réussie");
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB :", err);
    process.exit(1);
  });
