import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function DetalleScreen({ producto, onVolver, onAgregarCarrito }) {
  return (
    <ScrollView style={styles.containerFondo}>
      <TouchableOpacity style={styles.headerAtras} onPress={onVolver}>
        <Text style={styles.textoVolver}>✕ Cerrar</Text>
      </TouchableOpacity>

      <Image source={{ uri: producto.imagen }} style={styles.imagenFondoDetalle} />
      
      <View style={styles.contenedorInfoDetalle}>
        <Text style={styles.fileDetalleTitulo}>{producto.nombre}</Text>
        <View style={styles.filaInfoMeta}>
          <Text style={styles.metaAno}>2026</Text>
          <View style={styles.metaBadge}><Text style={styles.metaBadgeTexto}>Disponible</Text></View>
          <Text style={styles.metaPrecio}>${producto.precio.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.btnNetflixRojoAncho} onPress={() => onAgregarCarrito(producto)}>
          <Text style={styles.btnTextoBlancoBold}>🛒 Añadir a mi Lista de Compra</Text>
        </TouchableOpacity>

        <Text style={styles.detalleAutorTexto}>Autor/Escritor: {producto.autor}</Text>
        <Text style={styles.detalleSinopsis}>{producto.descripcion}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerFondo: { flex: 1, backgroundColor: '#111' },
  headerAtras: { position: 'absolute', top: 20, left: 16, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  textoVolver: { color: '#fff', fontWeight: 'bold' },
  imagenFondoDetalle: { width: '100%', height: 260, resizeMode: 'cover' },
  contenedorInfoDetalle: { padding: 16 },
  fileDetalleTitulo: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  filaInfoMeta: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  metaAno: { color: '#46D369', fontWeight: 'bold', marginRight: 12 },
  metaBadge: { backgroundColor: '#333', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 12 },
  metaBadgeTexto: { color: '#aaa', fontSize: 11 },
  metaPrecio: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  btnNetflixRojoAncho: { backgroundColor: '#E50914', padding: 14, borderRadius: 4, alignItems: 'center', marginVertical: 12, width: '100%' },
  btnTextoBlancoBold: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  detalleAutorTexto: { color: '#aaa', fontSize: 14, marginTop: 6 },
  detalleSinopsis: { color: '#fff', fontSize: 14, lineHeight: 20, marginTop: 10 }
});
