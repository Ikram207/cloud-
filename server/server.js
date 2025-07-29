require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Mongoose model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  const { name, age, favoriteFoods } = req.body;

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
    res.status(500).json({ error: "Erreur serveur interne" });
  }
});

// Serve frontend build (React)
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Connexion MongoDB + Démarrage serveur
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(PORT, () => console.log(`🚀 Serveur en écoute sur le port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion à MongoDB :", err);
    process.exit(1);
  });

