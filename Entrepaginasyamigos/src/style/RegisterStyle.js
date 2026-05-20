const RegisterStyle = {
  container: {
    backgroundColor: '#121212', 
    minHeight: '100vh',
    width: '100vw', 
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    color: '#ffffff',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  navbar: {
    backgroundColor: '#000000', 
    width: '100%', 
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    gap: '40px', 
    boxSizing: 'border-box',
    marginBottom: '20px',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '22px',
  },
  titleWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'normal',
    margin: 0,
  },
  // 1. El contenedor ahora ocupa todo el ancho para permitir diferentes alineaciones dentro
  formBody: {
    width: '100%',
    padding: '10px 0',
    boxSizing: 'border-box',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    width: '100%',
  },
  // 2. CADA INPUT SE QUEDA ALINEADO A LA IZQUIERDA CON SU MARGEN (10%)
  inputGroup: {
    width: '90%',
    maxWidth: '550px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginLeft: '10%', // Mantiene el formulario exactamente donde te gustaba
    boxSizing: 'border-box',
  },
  label: {
    fontSize: '18px',
    color: '#ffffff',
    textAlign: 'left',
  },
  input: {
    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: '12px', 
    height: '48px',
    padding: '0 15px',
    fontSize: '16px',
    width: '100%', 
    boxSizing: 'border-box',
    color: '#000000',
    outline: 'none',
  },
  inputError: {
    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: '12px', 
    height: '48px',
    padding: '0 15px',
    fontSize: '16px',
    width: '100%', 
    boxSizing: 'border-box',
    color: '#e05368', 
    outline: 'none',
  },
  // 3. ¡EL BOTÓN Y EL LINK SE VAN AL CENTRO DE LA PANTALLA!
  footerWrapper: {
    width: '100vw',          // Ocupa todo el ancho de la pantalla
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',    // Los clava perfectamente al centro horizontal
    justifyContent: 'center',
    gap: '15px',
    marginTop: '40px', 
    paddingBottom: '40px',
    // Reseteamos cualquier empuje izquierdo para que el centro sea real
    marginLeft: 0, 
    marginRight: 0,
  },
  button: {
    backgroundColor: '#919681', 
    color: '#000000',
    border: 'none',
    borderRadius: '15px',    
    padding: '12px 50px',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: 'fit-content',
  },
  loginLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '15px',
    textAlign: 'center',     
    lineHeight: '1.5',
  }
};

export default RegisterStyle;