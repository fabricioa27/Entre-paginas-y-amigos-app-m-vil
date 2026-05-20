import React, { useState } from 'react';
// Añadimos el prefijo /src/ que es donde verdaderamente viven tus carpetas
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

export default function App() {
  // Estado para controlar qué pantalla renderizar de forma nativa
  const [vistaActual, setVistaActual] = useState('login');

  // Función interactiva para cambiar de vista desde los botones de los formularios
  const navegarA = (pantalla) => {
    setVistaActual(pantalla);
  };

  return (
    <>
      {vistaActual === 'login' ? (
        <LoginScreen cambiarPantalla={navegarA} />
      ) : (
        <RegisterScreen cambiarPantalla={navegarA} />
      )}
    </>
  );
}