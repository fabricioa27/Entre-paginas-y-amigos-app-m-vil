const LoginStyle = {
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
  inputGroup: {
    width: '90%',
    maxWidth: '550px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginLeft: '10%', 
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
  footerWrapper: {
    width: '100vw',          
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',    
    justifyContent: 'center',
    gap: '15px',
    marginTop: '40px', 
    paddingBottom: '40px',
    marginLeft: 0, 
    marginRight: 0,
  },
  
  // MODIFICADO: Cambiado a fondo sólido oliva con texto oscuro y esquinas suavizadas
  button: {
    backgroundColor: '#8f9385',   // Tu color oliva/grisáceo de la captura
    color: '#121212',             // Texto oscuro para un buen contraste
    border: 'none',               // Eliminamos el borde innecesario
    borderRadius: '14px',         // Esquinas suavizadas (ya no es una cápsula total de 25px)
    padding: '12px 40px',         
    fontSize: '20px',
    cursor: 'pointer',
    fontWeight: 'normal',         // Tipografía limpia y delgada como en la imagen
    width: 'fit-content',
    fontFamily: 'sans-serif',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
  },

  registerLink: {
    backgroundColor: 'transparent', 
    border: 'none',                
    color: '#ffffff',              
    fontSize: '16px',              
    textAlign: 'center',     
    lineHeight: '1.4',            
    cursor: 'pointer',            
    fontFamily: 'sans-serif',
    padding: 0,                   
    outline: 'none',               
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
  }
};

export default LoginStyle;