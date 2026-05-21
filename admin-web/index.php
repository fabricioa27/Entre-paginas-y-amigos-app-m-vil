<?php
session_start();

// Si ya inició sesión antes, mandarlo directo al panel
if (isset($_SESSION['admin_logueado'])) {
    header("Location: admin.php");
    exit();
}

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = trim($_POST['correo']);
    $clave = $_POST['clave'];

    // Validación local estricta con las credenciales solicitadas
    if ($correo === "emersonarevalo77@gmail.com" && $clave === "123456") {
        $_SESSION['admin_logueado'] = true;
        header("Location: admin.php");
        exit();
    } else {
        $error = "El correo electrónico o la contraseña son incorrectos.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login - Panel Administrador</title>
    <link rel="stylesheet" href="estilo1.css">
</head>
<body class="login-body">
    <div class="login-card">
        <h2>🔑 Iniciar Sesión</h2>
        
        <?php if (!empty($error)): ?>
            <div class="error-msg"><?php echo $error; ?></div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <div class="input-group">
                <label>Correo Electrónico</label>
                <input type="email" name="correo" required placeholder="emersonarevalo77@gmail.com" value="<?php echo isset($_POST['correo']) ? htmlspecialchars($_POST['correo']) : ''; ?>">
            </div>
            <div class="input-group">
                <label>Contraseña</label>
                <input type="password" name="clave" required placeholder="••••••••">
            </div>
            <button type="submit" class="btn-primary">ENTRAR AL PANEL</button>
        </form>
    </div>
</body>
</html>