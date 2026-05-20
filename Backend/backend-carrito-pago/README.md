# Backend de carrito y pago simulado

API REST hecha con Node.js, Express y MySQL.

Está pensada para usar una base de datos MySQL en Railway.

## Datos que guarda

La orden solo guarda:

- Nombre
- Correo
- Número de teléfono
- Dirección
- Fecha de pago
- Método de pago
- Total

No guarda datos de tarjeta porque el pago es simulado.

## Instalar dependencias

```bash
npm install
```

## Configurar variables

Copia `.env.example` y crea un archivo llamado `.env`.

```env
PORT=3000
DB_HOST=tu_host_railway
DB_USER=tu_usuario_railway
DB_PASSWORD=tu_password_railway
DB_NAME=railway
DB_PORT=3306
```

## Crear tablas

Ejecuta el archivo:

```txt
src/sql/schema.sql
```

En Railway puedes abrir la consola/query de MySQL y pegar el contenido del archivo.

## Ejecutar servidor

```bash
npm run dev
```

O:

```bash
npm start
```

## Endpoints

### Agregar libro al carrito

POST

```txt
http://localhost:3000/api/v1/cart/add
```

Body:

```json
{
  "bookId": 1,
  "title": "El principito",
  "price": 12.50,
  "quantity": 2
}
```

### Ver carrito

GET

```txt
http://localhost:3000/api/v1/cart
```

### Eliminar libro del carrito

DELETE

```txt
http://localhost:3000/api/v1/cart/remove/1
```

### Vaciar carrito

DELETE

```txt
http://localhost:3000/api/v1/cart/clear
```

### Pago contra entrega

POST

```txt
http://localhost:3000/api/v1/payment/checkout
```

Body:

```json
{
  "customerName": "Gabriel Echegoyen",
  "customerEmail": "gaboechegoyen24@gmail.com",
  "phone": "7777-7777",
  "address": "Quezaltepeque, La Libertad",
  "paymentMethod": "contra_entrega"
}
```

### Pago con tarjeta simulado

POST

```txt
http://localhost:3000/api/v1/payment/checkout
```

Body:

```json
{
  "customerName": "Gabriel Echegoyen",
  "customerEmail": "gaboechegoyen24@gmail.com",
  "phone": "7777-7777",
  "address": "Quezaltepeque, La Libertad",
  "paymentMethod": "tarjeta"
}
```

### Ver órdenes

GET

```txt
http://localhost:3000/api/v1/payment/orders
```

### Ver detalle de una orden

GET

```txt
http://localhost:3000/api/v1/payment/orders/1/details
```
