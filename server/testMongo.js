require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI =", MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connexion MongoDB OK");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Erreur connexion MongoDB :", err);
    process.exit(1);
  });
