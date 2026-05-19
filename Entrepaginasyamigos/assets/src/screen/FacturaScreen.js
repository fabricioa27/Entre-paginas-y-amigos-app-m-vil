import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function FacturaScreen({ nombre, correo, direccion, carrito, total, onFinalizar }) {
  return (
    <View style={styles.containerFondoPadding}>
      <Text style={styles.iconoFacturaSuccess}>✓</Text>
      <Text style={styles.tituloFacturaOk}>¡Transacción Exitosa!</Text>
      <Text style={styles.subFacturaOk}>Los datos comerciales han sido enviados de manera síncrona al servidor.</Text>

      <View style={styles.ticketFacturaCuerpo}>
        <Text style={styles.txtTicketItem}><Text style={styles.boldLabel}>Cliente Receptivo:</Text> {nombre}</Text>
        <Text style={styles.txtTicketItem}><Text style={styles.boldLabel}>Correo Electrónico:</Text> {correo}</Text>
        <Text style={styles.txtTicketItem}><Text style={styles.boldLabel}>Dirección de Destino:</Text> {direccion}</Text>
        <Text style={styles.txtTicketItem}><Text style={styles.boldLabel}>Fecha de Adquisición:</Text> {new Date().toLocaleDateString('es-SV')}</Text>
        
        <View style={styles.lineaDivisoria} />
        
        <Text style={styles.boldLabel}>Detalle de Artículos:</Text>
        {carrito.map((item) => (
          <Text key={item.id} style={styles.txtLibroTicket}>• {item.nombre} (Unidades: {item.cantidad})</Text>
        ))}

        <View style={styles.lineaDivisoria} />
        <Text style={styles.txtTotalTicket}>Total Cobrado Neto: ${total}</Text>
      </View>

      <TouchableOpacity style={styles.btnGrisNetflixAncho} onPress={onFinalizar}>
        <Text style={styles.btnTextoBlanco}>Finalizar y Regresar al Menú</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFondoPadding: { flex: 1, backgroundColor: '#111', padding: 16 },
  iconoFacturaSuccess: { color: '#46D369', fontSize: 50, textAlign: 'center', marginTop: 20 },
  tituloFacturaOk: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
  subFacturaOk: { color: '#aaa', fontSize: 13, textAlign: 'center', marginVertical: 10, paddingHorizontal: 20 },
  ticketFacturaCuerpo: { backgroundColor: '#fff', borderRadius: 6, padding: 16, marginVertical: 20 },
  txtTicketItem: { color: '#333', fontSize: 14, marginBottom: 4 },
  boldLabel: { fontWeight: 'bold' },
  lineaDivisoria: { height: 1, backgroundColor: '#ddd', marginVertical: 10, borderStyle: 'dashed' },
  txtLibroTicket: { color: '#555', fontSize: 13, marginTop: 4 },
  txtTotalTicket: { color: '#000', fontSize: 15, fontWeight: 'bold', textAlign: 'right' },
  btnGrisNetflixAncho: { backgroundColor: '#333', padding: 12, borderRadius: 4, alignItems: 'center' },
  btnTextoBlanco: { color: '#fff', fontWeight: '600', fontSize: 15 }
});
