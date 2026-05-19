import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Billboard({ producto, onVerDetalle, onAgregarCarrito }) {
  if (!producto) return null;
  
  return (
    <View style={styles.billboardContenedor}>
      <Image source={{ uri: producto.imagen }} style={styles.billboardImagen} />
      <View style={styles.billboardGradiente}>
        <Text style={styles.billboardTitulo}>{producto.nombre}</Text>
        <Text style={styles.billboardSub}>{producto.autor}</Text>
        <View style={styles.billboardBotonesFila}>
          <TouchableOpacity style={styles.btnBlancoNetflix} onPress={() => onVerDetalle(producto)}>
            <Text style={styles.btnTextoNegro}>👁 Ver Descripción</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnGrisNetflix} onPress={() => onAgregarCarrito(producto)}>
            <Text style={styles.btnTextoBlanco}>+ Mi Lista</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  billboardContenedor: { width: '100%', height: 350, position: 'relative' },
  billboardImagen: { width: '100%', height: '100%', resizeMode: 'cover' },
  billboardGradiente: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: 'rgba(17,17,17,0.85)', alignItems: 'center' },
  billboardTitulo: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  billboardSub: { color: '#aaa', fontSize: 14, marginVertical: 4 },
  billboardBotonesFila: { flexDirection: 'row', marginTop: 12 },
  btnBlancoNetflix: { backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 4, marginRight: 10 },
  btnTextoNegro: { color: '#000', fontWeight: 'bold' },
  btnGrisNetflix: { backgroundColor: 'rgba(102,102,102,0.6)', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 4 },
  btnTextoBlanco: { color: '#fff', fontWeight: '600' },
});
