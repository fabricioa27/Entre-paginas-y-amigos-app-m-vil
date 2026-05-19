import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

export default function CarritoScreen({ carrito, onVolver, onModificarCantidad, onProcederCheckout, total }) {
  return (
    <View style={styles.containerFondoPadding}>
      <View style={styles.headerModal}>
        <TouchableOpacity onPress={onVolver}>
          <Text style={styles.textoVolver}>← Seguir Viendo</Text>
        </TouchableOpacity>
        <Text style={styles.tituloSeccion}>Mi Lista de Pedido</Text>
      </View>

      {carrito.length === 0 ? (
        <View style={styles.centroVacio}><Text style={styles.txtGris}>No hay artículos en tu lista.</Text></View>
      ) : (
        <>
          <FlatList
            data={carrito}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemCarritoFila}>
                <Image source={{ uri: item.imagen }} style={styles.miniPoster} />
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={styles.txtBlancoBold} numberOfLines={1}>{item.nombre}</Text>
                  <Text style={styles.txtRojoPrecio}>${(item.precio * item.cantidad).toFixed(2)}</Text>
                </View>
                <View style={styles.controlesFila}>
                  <TouchableOpacity style={styles.btnCirculo} onPress={() => onModificarCantidad(item.id, 'menos')}>
                    <Text style={styles.btnTextoBlanco}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.txtCantidad}>{item.cantidad}</Text>
                  <TouchableOpacity style={styles.btnCirculo} onPress={() => onModificarCantidad(item.id, 'mas')}>
                    <Text style={styles.btnTextoBlanco}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View style={styles.footerCheckoutContenedor}>
            <View style={styles.filaSubtotal}>
              <Text style={styles.txtGrisGrande}>Total de Compra:</Text>
              <Text style={styles.txtTotalPrecio}>${total}</Text>
            </View>
            <TouchableOpacity style={styles.btnNetflixRojoAncho} onPress={onProcederCheckout}>
              <Text style={styles.btnTextoBlancoBold}>Ir a Facturación</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerFondoPadding: { flex: 1, backgroundColor: '#111', padding: 16 },
  headerModal: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  textoVolver: { color: '#fff', fontWeight: 'bold' },
  tituloSeccion: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  centroVacio: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  txtGris: { color: '#666', fontSize: 15 },
  itemCarritoFila: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', padding: 10, borderRadius: 4, marginBottom: 10 },
  miniPoster: { width: 40, height: 55, borderRadius: 2 },
  txtBlancoBold: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  txtRojoPrecio: { color: '#E50914', marginTop: 2, fontWeight: '600' },
  controlesFila: { flexDirection: 'row', alignItems: 'center' },
  btnCirculo: { backgroundColor: '#333', width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  btnTextoBlanco: { color: '#fff', fontWeight: '600' },
  txtCantidad: { color: '#fff', marginHorizontal: 8, fontWeight: 'bold' },
  footerCheckoutContenedor: { borderTopWidth: 1, borderTopColor: '#333', paddingTop: 16 },
  filaSubtotal: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  txtGrisGrande: { color: '#aaa', fontSize: 15 },
  txtTotalPrecio: { color: '#46D369', fontSize: 18, fontWeight: 'bold' },
  btnNetflixRojoAncho: { backgroundColor: '#E50914', padding: 14, borderRadius: 4, alignItems: 'center', marginVertical: 12, width: '100%' }
});
