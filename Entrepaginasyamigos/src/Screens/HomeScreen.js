import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, SafeAreaView, Alert, Dimensions } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import AdminScreen from './AdminScreen'; 

const { width } = Dimensions.get('window');

// Enlaces locales apuntando a tu XAMPP
const API_OBTENER_LIBROS = "http://192.168.1.14/api/obtener_libros.php"; 
const API_GUARDAR_PEDIDO = "http://192.168.1.14/api/guardar_pedido.php"; 
export default function HomeScreen() {
  const [currentTab, setCurrentTab] = useState('home'); 
  const isAdmin = auth.currentUser?.email === 'emersonarevalo77@gmail.com';

  const [libros, setLibros] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('Todos');

  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [pedidosLocal, setPedidosLocal] = useState([]); 

  const [checkoutStep, setCheckoutStep] = useState(0); 
  const [direccion, setDireccion] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [mcv, setMcv] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [ultimoRecibo, setUltimoRecibo] = useState(null);

  // Cargar libros desde MySQL cada vez que entramos al Home
  const cargarLibrosDesdeMySQL = async () => {
    try {
      const response = await fetch(API_OBTENER_LIBROS);
      const datos = await response.json();
      if (Array.isArray(datos)) {
        setLibros(datos);
      }
    } catch (error) {
      console.log("Error consultando libros en MySQL:", error);
    }
  };

  useEffect(() => {
    if (currentTab === 'home') {
      cargarLibrosDesdeMySQL();
    }
  }, [currentTab]);

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter(favId => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  const agregarAlCarrito = (libro) => {
    if (libro.stock <= 0) {
      Alert.alert('Sin Stock', 'Lo sentimos, este libro no tiene unidades disponibles.');
      return;
    }
    const existe = carrito.find(item => item.id === libro.id);
    if (existe) {
      if (existe.cantidad < libro.stock) {
        setCarrito(carrito.map(item => item.id === libro.id ? { ...item, cantidad: item.cantidad + 1 } : item));
      } else {
        Alert.alert('Límite alcanzado', 'No puedes agregar más unidades.');
      }
    } else {
      setCarrito([...carrito, { ...libro, cantidad: 1 }]);
    }
  };
  const actualizarCantidadCarrito = (id, incremento) => {
    const item = carrito.find(i => i.id === id);
    const libroOriginal = libros.find(l => l.id === id);
    if (!item) return;

    if (incremento > 0 && item.cantidad >= libroOriginal.stock) {
      Alert.alert('Stock Máximo', 'No hay más piezas disponibles.');
      return;
    }

    const nuevaCantidad = item.cantidad + incremento;
    if (nuevaCantidad <= 0) {
      setCarrito(carrito.filter(i => i.id !== id));
    } else {
      setCarrito(carrito.map(i => i.id === id ? { ...i, cantidad: nuevaCantidad } : i));
    }
  };

  const totalCompra = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0).toFixed(2);

  const ejecutarCompraMySQL = async () => {
    if (!direccion || !tarjeta || !mcv || !vencimiento) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los datos de envío y pago.');
      return;
    }

    const pedidoData = {
      usuarioId: auth.currentUser?.uid || 'invitado_id',
      fecha: new Date().toLocaleDateString(),
      direccion: direccion,
      total: totalCompra,
      items: carrito.map(i => ({ nombre: i.nombre, cantidad: i.cantidad, precio: i.precio }))
    };

    try { const response = await fetch(API_GUARDAR_PEDIDO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoData)
      });

      const resultado = await response.json();

      if (resultado.status === 'success') {
        setPedidosLocal([pedidoData, ...pedidosLocal]);
        setUltimoRecibo({
          id: Math.floor(Math.random() * 90000) + 10000,
          total: totalCompra,
          items: carrito
        });

        setCarrito([]);
        setDireccion(''); setTarjeta(''); setMcv(''); setVencimiento('');
        setCheckoutStep(2);
      } else {
        Alert.alert('Error en el Servidor PHP', resultado.message);
      }
    } catch (error) {
      Alert.alert('Error de Conexión', 'No se pudo guardar el pedido.');
    }
  };

  const librosFiltrados = libros.filter(libro => {
    const cumpleBusqueda = libro.nombre.toLowerCase().includes(search.toLowerCase());
    const cumpleCategoria = selectedCategoria === 'Todos' || libro.categoria === selectedCategoria;
    return cumpleBusqueda && cumpleCategoria;
  });

  const categoriasUnicas = ['Todos', ...new Set(libros.map(l => l.categoria))];

  return (
    <SafeAreaView style={styles.container}>
      
      {currentTab === 'home' && (
        <View style={styles.tabContent}>
          <Text style={styles.headerTitle}>Entre Páginas <Text style={{color:'#B20710'}}>&</Text> Amigos</Text>
          
          <TextInput 
            style={styles.searchBar}
            placeholder="🔍 Buscar por nombre de libro..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />

          <View style={{ height: 50, marginBottom: 10 }}>
            <FlatList 
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categoriasUnicas}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.categoryTag, selectedCategoria === item && styles.categoryTagSelected]}
                  onPress={() => setSelectedCategoria(item)}
                >
                  <Text style={[styles.categoryText, selectedCategoria === item && { fontWeight: 'bold' }]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

           <FlatList 
            data={librosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.rowGrid}
            renderItem={({ item }) => (
              <View style={styles.bookCard}>
                <Image source={{ uri: item.imagenUrl }} style={styles.bookImage} />
                <Text style={styles.bookTitle} numberOfLines={1}>{item.nombre}</Text>
                <Text style={styles.bookCategory}>{item.categoria}</Text>
                <Text style={styles.bookPrice}>${item.precio.toFixed(2)}</Text>
                <Text style={styles.bookStock}>Stock: {item.stock}</Text>
                
                <View style={styles.actionsRow}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => toggleFavorito(item.id)}>
                    <Text style={styles.actionEmoji}>{favoritos.includes(item.id) ? '❤️' : '🤍'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={() => agregarAlCarrito(item)}>
                    <Text style={styles.actionEmoji}>🛒</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay libros registrados con esos criterios.</Text>}
          />
        </View>
      )}

      {currentTab === 'carrito' && (
        <View style={styles.tabContent}>
          <Text style={styles.headerTitle}>Tu 🛒 Carrito </Text>
          {checkoutStep === 0 && (
            <View style={{ flex: 1 }}>
              <FlatList 
                data={carrito}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                    <Text style={styles.cartItemName}>{item.nombre} (${item.precio.toFixed(2)})</Text>
                    <View style={styles.qtyRow}>
                      <TouchableOpacity onPress={() => actualizarCantidadCarrito(item.id, -1)} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
                      <Text style={styles.qtyText}>{item.cantidad}</Text>
                      <TouchableOpacity onPress={() => actualizarCantidadCarrito(item.id, 1)} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
                    </View>
                  </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Tu carrito está vacío 📝</Text>}
              />
              {carrito.length > 0 && (
                <View style={styles.checkoutFooter}>
                  <Text style={styles.totalText}>Total: ${totalCompra}</Text>
                  <TouchableOpacity style={styles.btnMain} onPress={() => setCheckoutStep(1)}>
                    <Text style={styles.btnMainText}>PROCEDER AL PAGO</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {checkoutStep === 1 && (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Datos de Facturación</Text>
              <TextInput style={styles.input} placeholder="Dirección de Entrega" placeholderTextColor="#888" value={direccion} onChangeText={setDireccion} />
              <TextInput style={styles.input} placeholder="Número de Tarjeta" keyboardType="numeric" placeholderTextColor="#888" value={tarjeta} onChangeText={setTarjeta} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput style={[styles.input, { width: '45%' }]} placeholder="MM/AA" placeholderTextColor="#888" value={vencimiento} onChangeText={setVencimiento} />
                <TextInput style={[styles.input, { width: '45%' }]} placeholder="CVC" secureTextEntry keyboardType="numeric" placeholderTextColor="#888" value={mcv} onChangeText={setMcv} />
              </View>
              <TouchableOpacity style={styles.btnMain} onPress={ejecutarCompraMySQL}>
                <Text style={styles.btnMainText}>CONFIRMAR Y GUARDAR EN MYSQL</Text>
              </TouchableOpacity>
            </View>
          )}

          {checkoutStep === 2 && ultimoRecibo && (
            <View style={styles.receiptContainer}>
              <Text style={styles.receiptEmoji}>🎉</Text>
              <Text style={styles.receiptTitle}>¡Transacción Guardada!</Text>
              <Text style={styles.receiptTotal}>Monto Registrado: ${ultimoRecibo.total}</Text>
              <TouchableOpacity style={styles.btnMain} onPress={() => { setCheckoutStep(0); setCurrentTab('home'); }}>
                <Text style={styles.btnMainText}>VOLVER AL INICIO</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {currentTab === 'pedidos' && (
        <View style={styles.tabContent}>
          <Text style={styles.headerTitle}>📦 Mis Pedidos Recientes</Text>
          <FlatList 
            data={pedidosLocal}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.orderCard}>
                <Text style={styles.orderDate}>Fecha: {item.fecha}</Text>
                <Text style={styles.orderDestiny} numberOfLines={1}>Destino: {item.direccion}</Text>
                <Text style={styles.orderTotal}>Total: ${parseFloat(item.total).toFixed(2)}</Text>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay compras en esta sesión.</Text>}
          />
        </View>
      )}

      {currentTab === 'cuenta' && (
        <View style={[styles.tabContent, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.accountText}>Perfil Activo:</Text>
          <Text style={styles.accountEmail}>{auth.currentUser?.email}</Text>
          {isAdmin && <Text style={{ color: '#2ecc71', fontWeight: 'bold', marginBottom: 20 }}>Acceso Nivel: Administrador Autónomo 🛠️</Text>}
          <TouchableOpacity style={styles.btnLogout} onPress={() => signOut(auth)}>
            <Text style={styles.btnLogoutText}>CERRAR SESIÓN</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentTab === 'admin' && isAdmin && (
        <View style={styles.tabContent}>
          <AdminScreen />
        </View>
      )}

      {/* TABS DE NAVEGACIÓN */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => { setCurrentTab('home'); setCheckoutStep(0); }}><Text style={[styles.navIcon, currentTab === 'home' && { color: '#B20710' }]}>🏠</Text><Text style={styles.navText}>Inicio</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentTab('carrito')}><Text style={[styles.navIcon, currentTab === 'carrito' && { color: '#B20710' }]}>🛒</Text><Text style={styles.navText}>Carrito</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentTab('pedidos')}><Text style={[styles.navIcon, currentTab === 'pedidos' && { color: '#B20710' }]}>📦</Text><Text style={styles.navText}>Pedidos</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentTab('cuenta')}><Text style={[styles.navIcon, currentTab === 'cuenta' && { color: '#B20710' }]}>👤</Text><Text style={styles.navText}>Cuenta</Text></TouchableOpacity>
        {isAdmin && (
          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentTab('admin')}><Text style={[styles.navIcon, currentTab === 'admin' && { color: '#2ecc71' }]}>🛠️</Text><Text style={[styles.navText, currentTab === 'admin' && { color: '#2ecc71' }]}>Admin</Text></TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

// ... Mantén exactamente tus mismos estilos del HomeScreen abajo ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#221F1F' },
  tabContent: { flex: 1, paddingHorizontal: 20, paddingTop: 20, marginBottom: 70 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginBottom: 15 },
  searchBar: { backgroundColor: '#2D2D2D', color: '#FFF', height: 45, borderRadius: 10, paddingHorizontal: 15, marginBottom: 15 },
  categoryTag: { backgroundColor: '#333', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 10, alignSelf: 'center' },
  categoryTagSelected: { backgroundColor: '#B20710' },
  categoryText: { color: '#FFF', fontSize: 14 },
  rowGrid: { justifyContent: 'space-between', marginBottom: 15 },
  bookCard: { backgroundColor: '#2D2D2D', width: (width - 55) / 2, borderRadius: 15, padding: 12, alignItems: 'center' },
  bookImage: { width: '100%', height: 160, borderRadius: 10, resizeMode: 'cover' },
  bookTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 15, marginTop: 8, width: '100%' },
  bookCategory: { color: '#AAA', fontSize: 12, alignSelf: 'flex-start', marginVertical: 2 },
  bookPrice: { color: '#B20710', fontWeight: 'bold', fontSize: 16, alignSelf: 'flex-start' },
  bookStock: { color: '#888', fontSize: 11, alignSelf: 'flex-start' },
  actionsRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 8 },
  actionButton: { backgroundColor: '#383535', padding: 8, borderRadius: 8, width: '45%', alignItems: 'center' },
  actionEmoji: { fontSize: 16 },
  cartItem: { backgroundColor: '#2D2D2D', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cartItemName: { color: '#FFF', fontSize: 15, fontWeight: '500', width: '60%' },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { backgroundColor: '#B20710', width: 30, height: 30, borderRadius: 5, justifyContent: 'center', alignItems: 'center' },qtyBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  qtyText: { color: '#FFF', marginHorizontal: 12, fontSize: 16, fontWeight: 'bold' },
  checkoutFooter: { marginTop: 'auto', borderTopWidth: 1, borderColor: '#444', paddingTop: 15 },
  totalText: { color: '#FFF', fontSize: 22, fontWeight: 'bold', textAlign: 'right', marginBottom: 15 },
  btnMain: { backgroundColor: '#B20710', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 15 },
  btnMainText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  emptyText: { color: '#AAA', textAlign: 'center', marginTop: 40, fontSize: 16 },
  formContainer: { padding: 10 },
  formTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#2D2D2D', color: '#FFF', height: 50, borderRadius: 10, paddingHorizontal: 15, marginBottom: 15 },
  receiptContainer: { alignItems: 'center', paddingVertical: 30 },
  receiptEmoji: { fontSize: 60, marginBottom: 10 },
  receiptTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  receiptTotal: { color: '#B20710', fontSize: 20, fontWeight: 'bold', marginVertical: 15 },
  orderCard: { backgroundColor: '#2D2D2D', padding: 15, borderRadius: 10, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#B20710' },
  orderDate: { color: '#FFF', fontWeight: 'bold' },
  orderDestiny: { color: '#AAA', marginVertical: 4 },
  orderTotal: { color: '#B20710', fontWeight: 'bold' },
  accountText: { color: '#888', fontSize: 16 },
  accountEmail: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  btnLogout: { borderColor: '#B20710', borderWidth: 2, width: '80%', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  btnLogoutText: { color: '#B20710', fontWeight: 'bold' },
  navBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#1A1818', flexDirection: 'row', borderTopWidth: 1, borderColor: '#333' },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navIcon: { fontSize: 20, color: '#888' },
  navText: { color: '#FFF', fontSize: 11, marginTop: 2 }
});