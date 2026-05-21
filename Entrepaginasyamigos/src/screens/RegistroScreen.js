import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export default function RegistroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Por favor llena todos los campos.');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert('Éxito', 'Cuenta creada correctamente'))
      .catch(error => Alert.alert('Error', error.message));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Crear Cuenta</Text>
        
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

        <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
          <Text style={styles.btnText}>REGISTRARSE</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 25 }}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? <Text style={{color:'#B20710', fontWeight:'bold'}}>Inicia sesión</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#221F1F' },
  inner: { flex: 1, justifyContent: 'center', padding: 30 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginBottom: 40 },
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
  btnRegister: { backgroundColor: '#B20710', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  linkText: { color: '#AAA', textAlign: 'center', fontSize: 15 }
});