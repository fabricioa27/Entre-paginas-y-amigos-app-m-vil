import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import Billboard from './Billboard';

export default function MenuScreen({ productos, cantidadCarrito, onIrAlCarrito, onSeleccionarProducto, onAgregarCarrito }) {
  
  const filtrarPorCategoria = (cat) => productos.filter(p => p.categoria === cat || !p.categoria);

  const renderFilaHorizontal = (tituloSeccion, listaFiltrada) => (
    <View style={styles.seccionNetflix}>
      <Text style={styles.tituloFila}>{tituloSeccion}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={listaFiltrada} 
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.tarjetaNetflixVertical}
            onPress={() => onSeleccionarProducto(item)}
          >
            <Image source={{ uri: item.imagen }} style={styles.posterNetflix} />
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <ScrollView style={styles.containerFondo}>
      <Navbar cantidadCarrito={cantidadCarrito} onIrAlCarrito={onIrAlCarrito} />
      
      {productos.length > 0 && (
        <Billboard 
          producto={productos[0]} 
          onVerDetalle={onSeleccionarProducto} 
          onAgregarCarrito={onAgregarCarrito} 
        />
      )}

      {renderFilaHorizontal('Tendencias de Hoy', filtrarPorCategoria('Populares'))}
      {renderFilaHorizontal('Novedades más Buscadas', filtrarPorCategoria('Tendencias'))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerFondo: { flex: 1, backgroundColor: '#111' },
  seccionNetflix: { marginTop: 24, paddingLeft: 16 },
  tituloFila: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  tarjetaNetflixVertical: { marginRight: 12 },
  posterNetflix: { width: 105, height: 155, borderRadius: 4, backgroundColor: '#333' }
});
