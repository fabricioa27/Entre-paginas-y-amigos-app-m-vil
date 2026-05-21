# Entre páginas y amigos

## Descripción
Proyecto de gestión de libros y pedidos para una biblioteca, con panel de administración web, API en PHP, y aplicación móvil en React Native usando Expo y Firebase.

---

## Herramientas y tecnologías utilizadas

- **PHP** (para la API y panel de administración)
- **MySQL** (base de datos relacional)
- **XAMPP** (servidor local para PHP y MySQL)
- **Firebase** (autenticación y almacenamiento en la app móvil)
- **Expo** (framework para desarrollo y ejecución de la app móvil)
- **React Native** (desarrollo de la app móvil)

---

## Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone <URL-del-repositorio>
```

### 2. Configuración del backend (API y Admin Web)
- Instalar **XAMPP** y ejecutar los servicios de **Apache** y **MySQL**.
- Copiar las carpetas `api/` y `admin-web/` al directorio `htdocs` de XAMPP.
- Crear una base de datos en **phpMyAdmin** llamada `biblioteca` (o el nombre que uses en tu proyecto).
- Importar el esquema SQL proporcionado (ver sección "Esquema de la base de datos").
- Configurar las credenciales de la base de datos en los archivos PHP si es necesario.

### 3. Configuración del frontend móvil (Expo/React Native)
- Instalar **Node.js** y **npm**.
- Instalar **Expo CLI** globalmente:
  ```bash
  npm install -g expo-cli
  ```
- Ir a la carpeta `Entrepaginasyamigos/`:
  ```bash
  cd Entrepaginasyamigos
  ```
- Instalar dependencias:
  ```bash
  npm install
  ```
- Configurar `src/config/firebaseConfig.js` con tus credenciales de Firebase.

---

## Cómo correr el programa

### Backend (API y Admin Web)
1. Iniciar **XAMPP** y asegurarse de que Apache y MySQL estén activos.
2. Acceder al panel de administración web desde:
   - [http://localhost/admin-web/](http://localhost/admin-web/)
3. La API estará disponible en:
   - [http://localhost/api/](http://localhost/api/)

### Frontend móvil (Expo)
1. Desde la carpeta `Entrepaginasyamigos/`, ejecutar:
   ```bash
   expo start
   ```
2. Escanear el QR con la app de **Expo Go** en tu celular para probar la app.

---

## Esquema de la base de datos (ejemplo)
```sql
CREATE TABLE libros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255),
  autor VARCHAR(255),
  genero VARCHAR(100),
  disponible BOOLEAN
);

CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_libro INT,
  usuario VARCHAR(255),
  fecha_pedido DATE,
  FOREIGN KEY (id_libro) REFERENCES libros(id)
);
```

---

## Estructura de carpetas y qué hace cada una

- **admin-web/**: Panel de administración web para gestionar libros y pedidos.
  - `admin.php`, `index.php`: Archivos principales del panel.
  - `estilo.css`, `estilo1.css`: Hojas de estilo.
- **api/**: Endpoints PHP para gestionar libros y pedidos (usados por la app y el panel web).
  - `gestion_libros.php`: Lógica para CRUD de libros.
  - `guardar_pedido.php`: Guardar pedidos de libros.
  - `obtener_libros.php`: Obtener lista de libros.
- **Entrepaginasyamigos/**: App móvil en React Native/Expo.
  - `App.js`, `index.js`: Entradas principales de la app.
  - `assets/`: Recursos estáticos (imágenes, etc).
  - `src/config/firebaseConfig.js`: Configuración de Firebase.
  - `src/screens/`: Pantallas de la app (Login, Registro, Home, Admin).
  - `src/service/`: Servicios auxiliares (puede contener lógica de conexión a API, etc).

---

## Hecho por:
Emerson Fabricio Arévalo González    ||    AG250495
Josué Gabriel Vásquez Echegoyen      ||    VE250083
Nayeli Eunice Huezo Guevara          ||    HG251807
Arturo Moisés Rodríguez Arias        ||    RA240290
Carlos Roberto Luna Diaz             ||    LD252724


