import React, { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import './App.css';

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const handleAdd = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <UserForm onAdd={handleAdd} />
      <UserList key={refresh} />
    </div>
  );
}
