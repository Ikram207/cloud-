import React, { useState } from "react";
import { addUser } from "../api";

export default function UserForm({ onAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [food, setFood] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser({ name, age: Number(age), favoriteFoods: [food] });
    setName("");
    setAge("");
    setFood("");
    if (onAdd) onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un utilisateur</h2>
      <input
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Âge"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        placeholder="Plat préféré"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}
