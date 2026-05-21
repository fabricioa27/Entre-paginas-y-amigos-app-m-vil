import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../config/firebaseConfig'; // Ruta local corregida

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '510274526170-02b23g6b629v7oqvvigqr1el48mcjce6.apps.googleusercontent.com',
    androidClientId: '510274526170-02b23g6b629v7oqvvigqr1el48mcjce6.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => Alert.alert('Éxito', 'Bienvenido(a)'))
        .catch(error => Alert.alert('Error', error.message));
    }
  }, [response]);

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Completa los campos');
      return;
    }
    signInWithEmailAndPassword(auth, email, password).catch(e => Alert.alert('Error', e.message));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.logo}>Entre Páginas<Text style={{color:'#B20710'}}>&</Text>Amigos</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Correo Electrónico" 
          placeholderTextColor="#888"
          value={email} 
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Contraseña" 
          placeholderTextColor="#888"
          secureTextEntry 
          value={password} 
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.btnText}>INICIAR SESIÓN</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btnGoogle, { opacity: !request ? 0.6 : 1 }]} 
          onPress={() => promptAsync()}
        >
          <Text style={styles.btnText}>Acceder con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Registro')} style={{ marginTop: 25 }}>
          <Text style={styles.linkText}>¿Nuevo aquí? <Text style={{color:'#B20710', fontWeight:'bold'}}>Regístrate</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#221F1F' },
  inner: { flex: 1, justifyContent: 'center', padding: 30 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginBottom: 40 },
  input: { 
    backgroundColor: '#2D2D2D', 
    color: '#FFF', 
    height: 55, 
    borderRadius: 12, 
    paddingHorizontal: 15, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#444'
  },
  btnLogin: { backgroundColor: '#B20710', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  btnGoogle: { backgroundColor: '#444', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 15 },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  linkText: { color: '#AAA', textAlign: 'center', fontSize: 15 }
});