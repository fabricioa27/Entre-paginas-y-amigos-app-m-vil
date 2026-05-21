<?php
session_start();

// Proteger la pantalla: si no está logueado, va para afuera
if (!isset($_SESSION['admin_logueado'])) {
    header("Location: index.php");
    exit();
}

// CORREGIDO: Configuración apuntando al nombre exacto de tu base de datos de la captura
$conexion = new mysqli("localhost", "root", "", "entre_paginas_amigos");

if ($conexion->connect_error) {
    die("Fallo de conexión en MySQL: " . $conexion->connect_error);
}

// Cerrar sesión
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit();
}

// Procesar Inserción o Actualización
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['guardar'])) {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $categoria = $_POST['categoria'];
    $precio = floatval($_POST['precio']);
    $stock = intval($_POST['stock']);
    $imagenUrl = !empty($_POST['imagenUrl']) ? $_POST['imagenUrl'] : 'https://via.placeholder.com/150';

    if (!empty($id)) {
        // Modo Edición
        $stmt = $conexion->prepare("UPDATE libros SET nombre=?, categoria=?, precio=?, stock=?, imagenUrl=? WHERE id=?");
        $stmt->bind_param("ssdisi", $nombre, $categoria, $precio, $stock, $imagenUrl, $id);
    } else {
        // Modo Registro Nuevo
        $stmt = $conexion->prepare("INSERT INTO libros (nombre, categoria, precio, stock, imagenUrl) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdis", $nombre, $categoria, $precio, $stock, $imagenUrl);
    }
    $stmt->execute();
    $stmt->close();
    header("Location: admin.php");
    exit();
}

// Procesar Eliminación
if (isset($_GET['eliminar'])) {
    $id_eliminar = intval($_GET['eliminar']);
    $stmt = $conexion->prepare("DELETE FROM libros WHERE id=?");
    $stmt->bind_param("i", $id_eliminar);
    $stmt->execute();
    $stmt->close();
    header("Location: admin.php");
    exit();
}

// Cargar datos para editar si se seleccionó un libro
$libro_editar = null;
if (isset($_GET['editar'])) {
    $id_editar = intval($_GET['editar']);
    $resultado = $conexion->query("SELECT * FROM libros WHERE id=$id_editar");
    if ($resultado->num_rows > 0) {
        $libro_editar = $resultado->fetch_assoc();
    }
}

// Obtener todos los libros actuales para la tabla
$libros = $conexion->query("SELECT * FROM libros ORDER BY id DESC");
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel Administrador - Web</title>
    <link rel="stylesheet" href="estilo.css">
</head>
<body>
    <header class="navbar">
        <h1>📚 Entre Páginas y Amigos — Panel PC</h1>
        <a href="?logout=1" class="btn-logout">Cerrar Sesión</a>
    </header>

    <div class="dashboard-container">
        <div class="form-section">
            <h3><?php echo $libro_editar ? '📝 Editar Detalles del Libro' : '➕ Insertar Nuevo Libro'; ?></h3>
            <form method="POST" action="">
                <input type="hidden" name="id" value="<?php echo $libro_editar ? $libro_editar['id'] : ''; ?>">
                
                <div class="input-group">
                    <label>Nombre del Libro</label>
                    <input type="text" name="nombre" value="<?php echo $libro_editar ? $libro_editar['nombre'] : ''; ?>" required>
                </div>
                <div class="input-group">
                    <label>Categoría / Género</label>
                    <input type="text" name="categoria" value="<?php echo $libro_editar ? $libro_editar['categoria'] : ''; ?>" required>
                </div>
                <div class="form-row">
                    <div class="input-group">
                        <label>Precio ($)</label>
                        <input type="number" step="0.01" name="precio" value="<?php echo $libro_editar ? $libro_editar['precio'] : ''; ?>" required>
                    </div>
                    <div class="input-group">
                        <label>Stock Inicial</label>
                        <input type="number" name="stock" value="<?php echo $libro_editar ? $libro_editar['stock'] : ''; ?>" required>
                    </div>
                </div>
                <div class="input-group">
                    <label>URL de la Imagen Portada</label>
                    <input type="url" name="imagenUrl" value="<?php echo $libro_editar ? $libro_editar['imagenUrl'] : ''; ?>" placeholder="https://ejemplo.com/imagen.jpg">
                </div>

                <button type="submit" name="guardar" class="btn-primary">
                    <?php echo $libro_editar ? 'ACTUALIZAR DETALLES' : 'INSERTAR LIBRO'; ?>
                </button>
                
                <?php if ($libro_editar): ?>
                    <a href="admin.php" class="btn-cancel">Cancelar Edición</a>
                <?php endif; ?>
            </form>
        </div>

        <div class="table-section">
            <h3>📦 Inventario Actual (<?php echo $libros->num_rows; ?> Títulos)</h3>
            <table>
                <thead>
                    <tr>
                        <th>Portada</th>
                        <th>Título</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ($libros->num_rows > 0): ?>
                        <?php while($row = $libros->fetch_assoc()): ?>
                            <tr>
                                <td><img src="<?php echo $row['imagenUrl']; ?>" class="table-thumb" alt="portada"></td>
                                <td class="txt-bold"><?php echo $row['nombre']; ?></td>
                                <td><span class="badge"><?php echo $row['categoria']; ?></span></td>
                                <td class="txt-price">$<?php echo number_format($row['precio'], 2); ?></td>
                                <td><?php echo $row['stock']; ?> uds</td>
                                <td>
                                    <a href="?editar=<?php echo $row['id']; ?>" class="btn-action edit-btn">✏️</a>
                                    <a href="?eliminar=<?php echo $row['id']; ?>" onclick="return confirm('¿Seguro que deseas remover este título de MySQL?')" class="btn-action delete-btn">🗑️</a>
                                </td>
                            </tr>
                        <?php endwhile; ?> <?php else: ?>
                        <tr>
                            <td colspan="6" style="text-align: center; color: #777; padding: 20px;">No hay libros registrados en la base de datos.</td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>