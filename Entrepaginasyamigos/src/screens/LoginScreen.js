import React, { useState } from 'react';
import styles from '../styles/LoginStyle';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export default function LoginScreen() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarLogin = async (e) => {
    e.preventDefault();

    if (!correo || !contrasena) {
      alert('Completa todos los campos');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        correo,
        contrasena
      );

      console.log('Usuario autenticado:', userCredential.user);
      alert('Inicio de sesión exitoso');

      // Aquí puedes redirigir a Home
      // navigation.navigate('Home');
    } catch (error) {
      console.error(error);

      if (error.code === 'auth/invalid-credential') {
        alert('Correo o contraseña incorrectos');
      } else {
        alert('Error al iniciar sesión');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleWrapper}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
      </div>

      <form style={styles.form} onSubmit={manejarLogin}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Correo:</label>
          <input
            type="email"
            style={styles.input}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Contraseña:</label>
          <input
            type="password"
            style={styles.input}
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>

        <div style={styles.footerWrapper}>
          <button type="submit" style={styles.button}>
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
}