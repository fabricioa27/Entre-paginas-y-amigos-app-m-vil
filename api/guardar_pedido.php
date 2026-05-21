<<<<<<< HEAD
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Configuración de conexión local
$servidor = "localhost";
$usuario = "root";
$contrasena = "";
$base_datos = "entre_paginas_amigos";

$conn = new mysqli($servidor, $usuario, $contrasena, $base_datos);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Conexión fallida: " . $conn->connect_error]));
}

// Asegurar soporte para eñes, tildes y emojis
$conn->set_charset("utf8mb4");

// 🔑 CORREGIDO: Leer correctamente los datos JSON crudos enviados desde React Native
$json_recibido = file_get_contents("php://input");
$id = json_decode($json_recibido, true);

// Validar que los datos requeridos no vengan vacíos
if (!empty($id['usuarioId']) && isset($id['total']) && !empty($id['direccion'])) {
    
    $usuarioId = $conn->real_escape_string($id['usuarioId']);
    $fecha     = $conn->real_escape_string($id['fecha']);
    $direccion = $conn->real_escape_string($id['direccion']);
    $total     = floatval($id['total']);
    
    // Guardamos el array de items como texto JSON para meterlo en un solo campo de la tabla
    $items = $conn->real_escape_string(json_encode($id['items'], JSON_UNESCAPED_UNICODE));

    $sql = "INSERT INTO pedidos (usuarioId, fecha, direccion, total, items) VALUES ('$usuarioId', '$fecha', '$direccion', $total, '$items')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Pedido guardado en MySQL local exitosamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al insertar en la base de datos: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Datos incompletos o inválidos recibidos en el backend."]);
}

$conn->close();
=======
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Configuración de conexión local
$servidor = "localhost";
$usuario = "root";
$contrasena = "";
$base_datos = "entre_paginas_amigos";

$conn = new mysqli($servidor, $usuario, $contrasena, $base_datos);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Conexión fallida: " . $conn->connect_error]));
}

// Asegurar soporte para eñes, tildes y emojis
$conn->set_charset("utf8mb4");

// 🔑 CORREGIDO: Leer correctamente los datos JSON crudos enviados desde React Native
$json_recibido = file_get_contents("php://input");
$id = json_decode($json_recibido, true);

// Validar que los datos requeridos no vengan vacíos
if (!empty($id['usuarioId']) && isset($id['total']) && !empty($id['direccion'])) {
    
    $usuarioId = $conn->real_escape_string($id['usuarioId']);
    $fecha     = $conn->real_escape_string($id['fecha']);
    $direccion = $conn->real_escape_string($id['direccion']);
    $total     = floatval($id['total']);
    
    // Guardamos el array de items como texto JSON para meterlo en un solo campo de la tabla
    $items = $conn->real_escape_string(json_encode($id['items'], JSON_UNESCAPED_UNICODE));

    $sql = "INSERT INTO pedidos (usuarioId, fecha, direccion, total, items) VALUES ('$usuarioId', '$fecha', '$direccion', $total, '$items')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Pedido guardado en MySQL local exitosamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al insertar en la base de datos: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Datos incompletos o inválidos recibidos en el backend."]);
}

$conn->close();
>>>>>>> 3a3c2ccad9498b3b469f5209910c08e6d0ae9769
?>