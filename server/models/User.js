app.post("/users", async (req, res) => {
  console.log("Body reçu:", req.body);  // <-- ici, premier truc à faire

  const { name, age, favoriteFoods } = req.body;

  // Validation simple
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: "Le champ 'name' est obligatoire et doit être une chaîne" });
  }

  if (age !== undefined && typeof age !== 'number') {
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
