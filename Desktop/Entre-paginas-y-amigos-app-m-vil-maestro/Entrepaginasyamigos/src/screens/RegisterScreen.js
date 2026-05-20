import React, { useState } from 'react';
import styles from '../styles/RegisterStyle.js';

export default function RegisterScreen({ cambiarPantalla }) {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const [errores, setErrores] = useState({
    nombre: '',
    usuario: '',
    correo: '',
    contrasena: ''
  });

  const manejarRegistro = (e) => {
    e.preventDefault(); 

    let erroresTemporales = { nombre: '', usuario: '', correo: '', contrasena: '' };
    let formularioValido = true;

    if (!nombre.trim()) {
      erroresTemporales.nombre = 'Campo no llenado';
      formularioValido = false;
    }

    if (!usuario.trim()) {
      erroresTemporales.usuario = 'Usuario no disponible';
      formularioValido = false;
    }

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.trim()) {
      erroresTemporales.correo = 'Campo no llenado';
      formularioValido = false;
    } else if (!expresionCorreo.test(correo)) {
      erroresTemporales.correo = 'Formato de correo no valido';
      formularioValido = false;
    }

    if (!contrasena.trim()) {
      erroresTemporales.contrasena = 'Campo no llenado';
      formularioValido = false;
    }

    setErrores(erroresTemporales);

    if (formularioValido) {
      console.log('¡Registro exitoso!', { nombre, usuario, correo, contrasena });
      cambiarPantalla('login');
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

      {/* Título centrado */}
      <div style={styles.titleWrapper}>
        <h2 style={styles.title}>Registrarse</h2>
      </div>

      {/* Cuerpo del formulario */}
      <div style={styles.formBody}>
        <form style={styles.form} onSubmit={manejarRegistro}>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre:</label>
            <input 
              type="text" 
              style={errores.nombre ? styles.inputError : styles.input} 
              value={errores.nombre ? '' : nombre}
              placeholder={errores.nombre || ''}
              onChange={(e) => {
                setNombre(e.target.value);
                if (errores.nombre) setErrores({ ...errores, nombre: '' });
              }}
            />
          </div>

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
            <label style={styles.label}>Correo:</label>
            <input 
              type="text" 
              style={errores.correo ? styles.inputError : styles.input} 
              value={errores.correo ? '' : correo}
              placeholder={errores.correo || ''}
              onChange={(e) => {
                setCorreo(e.target.value);
                if (errores.correo) setErrores({ ...errores, correo: '' });
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

          {/* Footer del formulario */}
          <div style={styles.footerWrapper}>
            <button type="submit" style={styles.button}>Registrarse</button>
            <button 
              type="button" 
              style={styles.linkButton} 
              onClick={() => cambiarPantalla('login')}
            >
              Ya tengo cuenta,<br />iniciar sesion
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}