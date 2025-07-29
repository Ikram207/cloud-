import React, { useEffect, useState } from "react";
import { getUsers } from "../api";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Données reçues non valides :", data);
          setUsers([]);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong> – {user.age} ans – aime{" "}
              {user.favoriteFoods?.join(", ")}
            </li>
          ))
        ) : (
          <li>Aucun utilisateur à afficher.</li>
        )}
      </ul>
    </div>
  );
}
