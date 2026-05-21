<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, PUT, DELETE, GET");
header("Content-Type: application/json; charset=UTF-8");

$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "entre_paginas_amigos";

$conexion = new mysqli($servidor, $usuario, $password, $base_datos);
$metodo = $_SERVER['REQUEST_METHOD'];

// 1. AGREGAR LIBRO (POST)
if ($metodo == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conexion->prepare("INSERT INTO libros (nombre, categoria, precio, stock, imagenUrl) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssdis", $data['nombre'], $data['categoria'], $data['precio'], $data['stock'], $data['imagenUrl']);
    if($stmt->execute()) echo json_encode(["status" => "success"]);
    else echo json_encode(["status" => "error", "message" => $conexion->error]);
}

// 2. ACTUALIZAR LIBRO (PUT)
if ($metodo == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conexion->prepare("UPDATE libros SET nombre=?, categoria=?, precio=?, stock=?, imagenUrl=? WHERE id=?");
    $stmt->bind_param("ssdisi", $data['nombre'], $data['categoria'], $data['precio'], $data['stock'], $data['imagenUrl'], $data['id']);
    if($stmt->execute()) echo json_encode(["status" => "success"]);
    else echo json_encode(["status" => "error", "message" => $conexion->error]);
}

// 3. ELIMINAR LIBRO (DELETE)
if ($metodo == 'DELETE') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $stmt = $conexion->prepare("DELETE FROM libros WHERE id = ?");
        $stmt->bind_param("i", $id);
        if($stmt->execute()) echo json_encode(["status" => "success"]);
        else echo json_encode(["status" => "error", "message" => $conexion->error]);
    }
}
$conexion->close();
?>