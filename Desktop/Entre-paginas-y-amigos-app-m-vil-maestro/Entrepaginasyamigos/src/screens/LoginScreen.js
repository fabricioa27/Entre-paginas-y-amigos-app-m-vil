import React, { useState } from 'react';
import styles from '../styles/LoginStyle.js';

export default function LoginScreen({ cambiarPantalla }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const [errores, setErrores] = useState({
    usuario: '',
    contrasena: ''
  });

  const manejarLogin = (e) => {
    e.preventDefault();

    let erroresTemporales = { usuario: '', contrasena: '' };
    let formularioValido = true;

    if (!usuario.trim()) {
      erroresTemporales.usuario = 'Campo no llenado';
      formularioValido = false;
    }

    if (!contrasena.trim()) {
      erroresTemporales.contrasena = 'Campo no llenado';
      formularioValido = false;
    }

    setErrores(erroresTemporales);

    if (formularioValido) {
      console.log('Inicio de sesión correcto', { usuario, contrasena });
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar Superior */}
      <nav style={styles.navbar}>
        <span style={styles.navLink}>Inicio</span>
        <span style={styles.navLink}>Catálogo</span>
        <span style={styles.navLink}>Favoritos</span>
        <span style={styles.navLink}>Reservar</span>
      </nav>

      {/* Título Iniciar Sesión Centrado */}
      <div style={styles.titleWrapper}>
        <h2 style={styles.title}>Iniciar Sesion</h2>
      </div>

      {/* Cuerpo del Login */}
      <div style={styles.formBody}>
        <form style={styles.form} onSubmit={manejarLogin}>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuario:</label>
            <input 
              type="text" 
              style={errores.usuario ? styles.inputError : styles.input} 
              value={errores.usuario ? '' : usuario}
              placeholder={errores.usuario || ''}
              onChange={(e) => {
                setUsuario(e.target.value);
                if (errores.usuario) setErrores({ ...errores, usuario: '' });
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña:</label>
            <input 
              type={errores.contrasena ? 'text' : 'password'} 
              style={errores.contrasena ? styles.inputError : styles.input} 
              value={errores.contrasena ? '' : contrasena}
              placeholder={errores.contrasena || ''}
              onChange={(e) => {
                setContrasena(e.target.value);
                if (errores.contrasena) setErrores({ ...errores, contrasena: '' });
              }}
            />
          </div>

          {/* Footer con cambio de pantalla interactivo */}
          <div style={styles.footerWrapper}>
            <button type="submit" style={styles.button}>Iniciar sesion</button>
            <button 
              type="button" 
              style={styles.linkButton} 
              onClick={() => cambiarPantalla('register')}
            >
              No tengo cuenta,<br />Registrarse
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}