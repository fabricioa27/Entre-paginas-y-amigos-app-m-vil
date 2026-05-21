import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator, View } from 'react-native';

// Tres niveles hacia atrás para salir de la app móvil y entrar al Backend global
import { auth } from './src/config/firebaseConfig';
import LoginScreen from './src/screens/LoginScreen';
import RegistroScreen from './src/screens/RegistroScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe; 
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
=======
import { SafeAreaView, StatusBar, StyleSheet, View, Text, Alert } from 'react-native';

// Importación de pantallas modulares
import MenuScreen from './src/screens/MenuScreen';
import DetalleScreen from './src/screens/DetalleScreen';
import CarritoScreen from './src/screens/CarritoScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import FacturaScreen from './src/screens/FacturaScreen';

// Enlaces de integración del Backend
const API_PRODUCTOS_URL = 'COLOCAR LINK DE LA API'; 
const API_CHECKOUT_URL = 'COLOCAR LINK DE LA API';
const API_VERIFICAR_SESION_URL = 'COLOCAR LINK DE LA API';

export default function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(true); // Manejo estricto por cuenta externa
  const [pantallaActual, setPantallaActual] = useState('menu');
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);

  // Formulario unificado en un objeto estructurado
  const [form, setForm] = useState({ nombre: '', correo: '', direccion: '', tarjeta: '', vencimiento: '', cvv: '' });

  useEffect(() => {
    //  Llamada HTTP GET para alimentar el carrusel de Netflix
    const obtenerProductosDeApi = async () => {
      try {
        const response = await fetch(API_PRODUCTOS_URL);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        // Respaldo por si el servidor local está apagado
        setProductos([
          { id: '1', nombre: 'Cien años de soledad', autor: 'Gabriel García Márquez', precio: 15.99, categoria: 'Populares', descripcion: 'La obra cumbre del realismo mágico...', imagen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop' },
          { id: '2', nombre: '1984', autor: 'George Orwell', precio: 11.25, categoria: 'Populares', descripcion: 'Una pavorosa visión distópica...', imagen: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop' }
        ]);
      }
    };
    obtenerProductosDeApi();
  }, []);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    Alert.alert('Añadido', `${producto.nombre} se sumó al carrito.`);
  };

  const modificarCantidad = (id, accion) => {
    const actual = carrito.find(item => item.id === id);
    if (accion === 'mas') {
      setCarrito(carrito.map(item => item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item));
    } else {
      if (actual.cantidad === 1) {
        setCarrito(carrito.filter(item => item.id !== id));
      } else {
        setCarrito(carrito.map(item => item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item));
      }
    }
  };

  const obtenerTotal = () => carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2);

  const procesarCompraConApi = async () => {
    if (!form.nombre || !form.correo || !form.direccion || !form.tarjeta || !form.vencimiento || !form.cvv) {
      Alert.alert('Campos Incompletos', 'Por favor, llena toda la información de la factura.');
      return;
    }

    const datosFactura = {
      nombre: form.nombre,
      correo: form.correo,
      direccion: form.direccion,
      fecha_compra: new Date().toLocaleDateString('es-SV') 
    };

    try {
      await fetch(API_CHECKOUT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosFactura)
      });
    } catch(error) { console.log(error); }

    setPantallaActual('factura');
  };

  const limpiarYRegresar = () => {
    setCarrito([]);
    setForm({ nombre: '', correo: '', direccion: '', tarjeta: '', vencimiento: '', cvv: '' });
    setPantallaActual('menu');
  };

  if (!usuarioLogueado) {
    return (
      <SafeAreaView style={styles.bloqueo}><Text style={styles.txt}>Acceso Limitado - Requiere Cuenta</SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />
      {pantallaActual === 'menu' && (
        <MenuScreen 
          productos={productos} 
          cantidadCarrito={carrito.reduce((a,b)=>a+b.cantidad,0)}
          onIrAlCarrito={() => setPantallaActual('carrito')}
          onSeleccionarProducto={(p) => { setProductoSeleccionado(p); setPantallaActual('detalle'); }}
          onAgregarCarrito={agregarAlCarrito}
        />
      )}
      {pantallaActual === 'detalle' && (
        <DetalleScreen 
          producto={productoSeleccionado} 
          onVolver={() => setPantallaActual('menu')} 
          onAgregarCarrito={agregarAlCarrito}
        />
      )}
      {pantallaActual === 'carrito' && (
        <CarritoScreen 
          carrito={carrito} 
          onVolver={() => setPantallaActual('menu')} 
          onModificarCantidad={modificarCantidad}
          onProcederCheckout={() => setPantallaActual('checkout')}
          total={obtenerTotal()}
        />
      )}
      {pantallaActual === 'checkout' && (
        <CheckoutScreen 
          fields={form} 
          setFields={setForm} 
          total={obtenerTotal()} 
          onVolver={() => setPantallaActual('carrito')}
          onConfirmar={procesarCompraConApi}
        />
      )}
      {pantallaActual === 'factura' && (
        <FacturaScreen 
          nombre={form.nombre} 
          correo={form.correo} 
          direccion={form.direccion} 
          carrito={carrito}
          total={obtenerTotal()}
          onFinalizar={limpiarYRegresar}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#111' },
  bloqueo: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  txt: { color: '#E50914', fontSize: 18, fontWeight: 'bold' }
});
>>>>>>> 3a3c2ccad9498b3b469f5209910c08e6d0ae9769
