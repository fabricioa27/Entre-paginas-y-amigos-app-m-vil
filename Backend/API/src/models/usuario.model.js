const sql = require("../config/database");

const Usuario = function (usuario) {
    this.id_usuario = usuario.id_usuario;
    this.nombre_completo = usuario.nombre_completo;
    this.correo = usuario.correo;
    this.password = usuario.password;
}

Usuario.getAll = (result) => {
    sql.query("SELECT id_usuario, nombre_completo, correo, fecha_registro FROM usuarios", (err, results) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, results);
    });
}

Usuario.findById = (id, result) => {
    sql.query("SELECT id_usuario, nombre_completo, correo, fecha_registro FROM usuarios WHERE id_usuario = ?", [id], (err, res) => {
        if (err) { result(err, null); return; }
        if (res.length) { result(null, res[0]); return; }
        result({ kind: "not_found" }, null);
    });
};

Usuario.create = (newUsuario, result) => {
    sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
        if (err) { result(err, null); return; }
        result(null, { id: res.insertId, ...newUsuario });
    });
}

Usuario.updateById = (id, usuario, result) => {
    sql.query(
        "UPDATE usuarios SET nombre_completo = ?, correo = ?, password = ? WHERE id_usuario = ?",
        [usuario.nombre_completo, usuario.correo, usuario.password, id],
        (err, res) => {
            if (err) { result(err, null); return; }
            if (res.affectedRows == 0) { result({ kind: "not_found" }, null); return; }
            result(null, { id: id, ...usuario });
        }
    );
};

Usuario.remove = (id, result) => {
    sql.query("DELETE FROM usuarios WHERE id_usuario = ?", [id], (err, res) => {
        if (err) { result(err, null); return; }
        if (res.affectedRows == 0) { result({ kind: "not_found" }, null); return; }
        result(null, res);
    });
}

Usuario.remove = (id, result) => {
    sql.query("DELETE FROM usuarios WHERE id_usuario = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Usuario eliminado con id: ", id);
        result(null, res);
    });
};

module.exports = Usuario;