import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Image, 
  ActivityIndicator, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminScreen() {
  // Estados para el formulario del Libro
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  
  // Estados de control de UI
  const [libros, setLibros] = useState([]);
  const [cargandoLibros, setCargandoLibros] = useState(false);
  const [guardando, setGuardando] = useState(false);

  // Tus constantes exactas de API (en minúsculas)
  const API_OBTENER = "http://192.168.1.14/api/obtener_libros.php";
  const API_GESTION = "http://192.168.1.14/api/gestion_libros.php";

  useEffect(() => {
    obtenerLibros();
  }, []);

  // --- OPERACIONES BACKEND (MySQL en XAMPP) ---

  const obtenerLibros = async () => {
    setCargandoLibros(true);
    try {
      const response = await fetch(API_OBTENER);
      const data = await response.json();
      setLibros(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron conectar los libros desde el servidor.');
    } finally {
      setCargandoLibros(false);
    }
  };

  const guardarLibro = async () => {
    if (!nombre || !categoria || !precio || !stock) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los datos del libro.');
      return;
    }

    setGuardando(true);
    const metodo = idSeleccionado ? 'PUT' : 'POST';

    const cuerpoDatos = {
      id: idSeleccionado,
      nombre,
      categoria,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      imagenUrl: imagenUrl || 'https://via.placeholder.com/150'
    };

    try {
      const response = await fetch(API_GESTION, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuerpoDatos)
      });

      const resultado = await response.json();

      if (resultado.success) {
        Alert.alert('¡Éxito!', idSeleccionado ? 'Libro actualizado.' : 'Libro insertado correctamente.');
        limpiarFormulario();
        obtenerLibros();
      } else {
        Alert.alert('Error del Servidor', resultado.message || 'No se pudo procesar la solicitud.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un fallo en la comunicación con el backend PHP.');
    } finally {
      setGuardando(false);
    }
  };

  const eliminarLibro = (id) => {
    Alert.alert(
      '¿Eliminar título?',
      'Esta acción borrará el libro permanentemente de MySQL.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_GESTION}?id=${id}`, {
                method: 'DELETE'
              });
              const resultado = await response.json();
              if (resultado.success) {
                Alert.alert('Eliminado', 'El libro ha sido removido.');
                obtenerLibros();
              }
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el elemento.');
            }
          }
        }
      ]
    );
  };

  const seleccionarParaEditar = (libro) => {
    setIdSeleccionado(libro.id);
    setNombre(libro.nombre);
    setCategoria(libro.categoria);
    setPrecio(libro.precio.toString());
    setStock(libro.stock.toString());
    setImagenUrl(libro.imagenUrl);
  };

  const limpiarFormulario = () => {
    setIdSeleccionado(null);
    setNombre('');
    setCategoria('');
    setPrecio('');
    setStock('');
    setImagenUrl('');
  };

  // --- FUNCIÓN AMIGABLE PARA LA GALERÍA ---
  const avisarGaleriaNoDisponible = () => {
    Alert.alert(
      "Subida por Galería",
      "¡Hola Admin! Esta opción se encuentra temporalmente en mantenimiento técnico por actualización de módulos de Expo Go.\n\nPor favor, introduce la URL de la imagen en el campo de abajo para registrar tu libro sin problemas. ✨",
      [{ text: "Entendido", style: "default" }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Encabezado limpio sin el (MySQL) */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={26} color="#E50914" />
        <Text style={styles.headerTitle}>Panel Administrador</Text>
      </View>

      {/* Formulario */}
      <View style={styles.formCard}>
        <TextInput 
          placeholder="Nombre del Libro" 
          placeholderTextColor="#777" 
          style={styles.input} 
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput 
          placeholder="Categoría / Género" 
          placeholderTextColor="#777" 
          style={styles.input} 
          value={categoria}
          onChangeText={setCategoria}
        />
        <TextInput 
          placeholder="Precio ($)" 
          placeholderTextColor="#777" 
          keyboardType="numeric" 
          style={styles.input} 
          value={precio}
          onChangeText={setPrecio}
        />
        <TextInput 
          placeholder="Stock Inicial" 
          placeholderTextColor="#777" 
          keyboardType="numeric" 
          style={styles.input} 
          value={stock}
          onChangeText={setStock}
        />

        {/* Portada - Solo botón de galería con el aviso amigable */}
        <Text style={styles.sectionLabel}>Portada del Libro</Text>
        <View style={styles.mediaButtonsContainer}>
          <TouchableOpacity style={styles.mediaButton} onPress={avisarGaleriaNoDisponible}>
            <Ionicons name="images-outline" size={18} color="white" />
            <Text style={styles.mediaButtonText}>Subir desde Galería</Text>
          </TouchableOpacity>
        </View>

        <TextInput 
          placeholder="Inserta la URL de la Imagen Portada" 
          placeholderTextColor="#555" 
          style={[styles.input, styles.inputUrl]} 
          value={imagenUrl}
          onChangeText={setImagenUrl}
        />

        {/* Previsualización si pegan una URL */}
        {imagenUrl ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imagenUrl }} style={styles.previewImage} />
            <Text style={styles.previewText}>Vista previa de la carátula</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.submitButton} onPress={guardarLibro} disabled={guardando}>
          {guardando ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>
              {idSeleccionado ? 'ACTUALIZAR DETALLES' : 'INSERTAR LIBRO'}
            </Text>
          )}
        </TouchableOpacity>

        {idSeleccionado && (
          <TouchableOpacity style={styles.cancelButton} onPress={limpiarFormulario}>
            <Text style={styles.cancelButtonText}>Cancelar Edición</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tabla de Inventario de MySQL */}
      <Text style={styles.listTitle}>Inventario ({libros.length} Títulos)</Text>

      {cargandoLibros ? (
        <ActivityIndicator size="large" color="#E50914" style={{ marginTop: 20 }} />
      ) : (
        libros.map((item) => (
          <View key={item.id.toString()} style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemNombre}>{item.nombre}</Text>
              <Text style={styles.itemDetalles}>{item.categoria} | Stock: {item.stock} | ${item.precio}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => seleccionarParaEditar(item)}>
                <Ionicons name="pencil" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => eliminarLibro(item.id)}>
                <Ionicons name="trash" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 15 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 15 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold', marginLeft: 8 },
  formCard: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 15, marginBottom: 20 },
  input: { backgroundColor: '#2A2A2A', color: 'white', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  inputUrl: { fontSize: 13, color: '#aaa', borderStyle: 'dashed', borderWidth: 1, borderColor: '#444' },
  sectionLabel: { color: '#bbb', fontSize: 14, marginBottom: 8, fontWeight: '600' },
  mediaButtonsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12 },
  mediaButton: { backgroundColor: '#333', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, paddingVertical: 11, borderRadius: 8, borderWidth: 1, borderColor: '#444' },
  mediaButtonText: { color: 'white', marginLeft: 8, fontWeight: 'bold', fontSize: 14 },
  previewContainer: { alignItems: 'center', marginVertical: 12, backgroundColor: '#252525', padding: 10, borderRadius: 8 },
  previewImage: { width: 75, height: 100, borderRadius: 4, resizeMode: 'cover' },
  previewText: { color: '#777', fontSize: 11, marginTop: 5 },
  submitButton: { backgroundColor: '#E50914', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 5 },
  submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  cancelButton: { alignItems: 'center', marginTop: 12, paddingVertical: 5 },
  cancelButtonText: { color: '#aaa', fontSize: 14, textDecorationLine: 'underline' },
  listTitle: { color: '#E50914', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  itemCard: { backgroundColor: '#1E1E1E', borderRadius: 10, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  itemInfo: { flex: 0.75 },
  itemNombre: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  itemDetalles: { color: '#aaa', fontSize: 13, marginTop: 4 },
  actionsContainer: { flexDirection: 'row', flex: 0.23, justifyContent: 'space-between' },
  editButton: { backgroundColor: '#F39C12', padding: 8, borderRadius: 6 },
  deleteButton: { backgroundColor: '#E50914', padding: 8, borderRadius: 6 }
});