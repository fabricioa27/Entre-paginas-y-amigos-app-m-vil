import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Navbar({ cantidadCarrito, onIrAlCarrito }) {
  return (
    <View style={styles.navbarNetflix}>
      <Text style={styles.logoTexto}>AMIGOS</Text>
      <TouchableOpacity style={styles.badgeCarritoContenedor} onPress={onIrAlCarrito}>
        <Text style={styles.iconCarritoTexto}>🛒</Text>
        {cantidadCarrito > 0 && (
          <View style={styles.badgeRojo}>
            <Text style={styles.badgeTexto}>{cantidadCarrito}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarNetflix: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 60, backgroundColor: '#111' },
  logoTexto: { color: '#E50914', fontSize: 24, fontWeight: '900', letterSpacing: 1 },
  badgeCarritoContenedor: { position: 'relative', padding: 6 },
  iconCarritoTexto: { fontSize: 22 },
  badgeRojo: { position: 'absolute', right: 0, top: 0, backgroundColor: '#E50914', borderRadius: 9, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
  badgeTexto: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});
