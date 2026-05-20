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
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },

  title: {
    fontSize: '32px',
    fontWeight: 'normal',
    margin: 0,
    color: '#ffffff',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    width: '90%',
    maxWidth: '550px',
  },

  inputGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
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

  footerWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    marginTop: '20px',
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

  registerLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '15px',
    textAlign: 'center',
    lineHeight: '1.5',
  },
};

export default LoginStyle;