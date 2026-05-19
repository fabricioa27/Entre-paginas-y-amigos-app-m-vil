import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function CheckoutScreen({ fields, setFields, total, onVolver, onConfirmar }) {
  return (
    <ScrollView style={styles.containerFondoPadding} keyboardShouldPersistTaps="handled">
      <View style={styles.headerModal}>
        <TouchableOpacity onPress={onVolver}>
          <Text style={styles.textoVolver}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.tituloSeccion}>Checkout</Text>
      </View>

      <Text style={styles.labelForm}>Información Requerida para Facturación</Text>
      <TextInput style={styles.inputNetflix} placeholder="Nombre Completo" placeholderTextColor="#666" value={fields.nombre} onChangeText={(text) => setFields({...fields, nombre: text})} />
      <TextInput style={styles.inputNetflix} placeholder="Correo Electrónico" placeholderTextColor="#666" keyboardType="email-address" value={fields.correo} onChangeText={(text) => setFields({...fields, correo: text})} />
      <TextInput style={styles.inputNetflix} placeholder="Dirección Completa de Domicilio" placeholderTextColor="#666" value={fields.direccion} onChangeText={(text) => setFields({...fields, direccion: text})} />

      <Text style={styles.labelForm}>Información de Pago Seguro (Tarjeta)</Text>
      <TextInput style={styles.inputNetflix} placeholder="Número de Tarjeta (16 dígitos)" placeholderTextColor="#666" keyboardType="numeric" secureTextEntry value={fields.tarjeta} onChangeText={(text) => setFields({...fields, tarjeta: text})} />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput style={[styles.inputNetflix, { width: '48%' }]} placeholder="MM/AA" placeholderTextColor="#666" keyboardType="numeric" value={fields.vencimiento} onChangeText={(text) => setFields({...fields, vencimiento: text})} />
        <TextInput style={[styles.inputNetflix, { width: '48%' }]} placeholder="CVV" placeholderTextColor="#666" keyboardType="numeric" secureTextEntry value={fields.cvv} onChangeText={(text) => setFields({...fields, cvv: text})} />
      </View>

      <View style={styles.recuadroMontoFinal}>
        <Text style={styles.txtBlancoBold}>Monto Final: ${total}</Text>
      </View>

      <TouchableOpacity style={styles.btnNetflixRojoAncho} onPress={onConfirmar}>
        <Text style={styles.btnTextoBlancoBold}>Completar y Generar Factura</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerFondoPadding: { flex: 1, backgroundColor: '#111', padding: 16 },
  headerModal: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  textoVolver: { color: '#fff', fontWeight: 'bold' },
  tituloSeccion: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  labelForm: { color: '#aaa', fontSize: 13, marginTop: 12, marginBottom: 6, fontWeight: '600' },
  inputNetflix: { backgroundColor: '#333', color: '#fff', padding: 12, borderRadius: 4, marginBottom: 10, fontSize: 15 },
  recuadroMontoFinal: { backgroundColor: '#1a1a1a', padding: 12, borderRadius: 4, alignItems: 'center' },
  txtBlancoBold: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  btnNetflixRojoAncho: { backgroundColor: '#E50914', padding: 14, borderRadius: 4, alignItems: 'center', marginVertical: 12, width: '100%' },
  btnTextoBlancoBold: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});
