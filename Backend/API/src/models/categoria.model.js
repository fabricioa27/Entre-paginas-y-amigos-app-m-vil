const sql = require("../config/database");

const Categoria = function(categoria) {
    this.id_categoria = categoria.id_categoria;
    this.nombre_categoria = categoria.nombre_categoria;
};

Categoria.create = (newCategoria, result) => {
    sql.query("INSERT INTO categorias SET ?", newCategoria, (err, res) => {
        if (err) { result(err, null); return; }
        result(null, { id: res.insertId, ...newCategoria });
    });
};

Categoria.getAll = (result) => {
    sql.query("SELECT * FROM categorias", (err, res) => {
        if (err) { result(err, null); return; }
        result(null, res);
    });
};

Categoria.findById = (id, result) => {
    sql.query("SELECT * FROM categorias WHERE id_categoria = ?", [id], (err, res) => {
        if (err) { result(err, null); return; }
        if (res.length) { result(null, res[0]); return; }
        result({ kind: "not_found" }, null);
    });
};

Categoria.updateById = (id, nombre, result) => {
    sql.query(
        "UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?",
        [nombre, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // No se encontró la categoría con ese ID
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Categoría actualizada: ", { id: id, nombre_categoria: nombre });
            result(null, { id: id, nombre_categoria: nombre });
        }
    );
};

module.exports = Categoria;