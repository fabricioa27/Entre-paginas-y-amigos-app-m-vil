<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Configura con los datos de tu conexión local
$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "entre_paginas_amigos";

$conexion = new mysqli($servidor, $usuario, $password, $base_datos);

if ($conexion->connect_error) {
    echo json_encode(["status" => "error", "message" => "Conexión fallida: " . $conexion->connect_error]);
    exit();
}

$sql = "SELECT id, nombre, categoria, imagenUrl, precio, stock FROM libros";
$resultado = $conexion->query($sql);

$libros = [];

if ($resultado->num_rows > 0) {
    while($fila = $resultado->fetch_assoc()) {
        // Casteamos los valores para que React Native los reciba con el tipo de dato correcto
        $libros[] = [
            "id" => $fila["id"],
            "nombre" => $fila["nombre"],
            "categoria" => $fila["categoria"],
            "imagenUrl" => $fila["imagenUrl"],
            "precio" => floatval($fila["precio"]),
            "stock" => intval($fila["stock"])
        ];
    }
}

echo json_encode($libros);
$conexion->close();
?>