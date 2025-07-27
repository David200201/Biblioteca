'use client';

import React, { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage("¡Inicio de sesión exitoso! Bienvenido, " + username);
      } else {
        setMessage(data.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setMessage("Error de conexión. Verifica que el servidor esté funcionando.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
          Iniciar Sesión
        </h1>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label htmlFor="username" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem"
              }}
              placeholder="Ingresa tu usuario"
            />
          </div>
          
          <div>
            <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1rem"
              }}
              placeholder="Ingresa tu contraseña"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? "Iniciando sesión..." : "Entrar"}
          </button>
        </form>
        
        {message && (
          <div style={{
            marginTop: "1rem",
            padding: "0.75rem",
            borderRadius: "4px",
            backgroundColor: message.includes("exitoso") ? "#d4edda" : "#f8d7da",
            color: message.includes("exitoso") ? "#155724" : "#721c24",
            border: `1px solid ${message.includes("exitoso") ? "#c3e6cb" : "#f5c6cb"}`
          }}>
            {message}
          </div>
        )}
        
        <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem", color: "#666" }}>
          <p><strong>Usuario de prueba:</strong> david</p>
          <p><strong>Contraseña:</strong> admin123</p>
        </div>
      </div>
    </div>
  );
} 