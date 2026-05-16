const sql = require("../config/database");

const Producto = function (producto) {
    this.id_libro = producto.id_libro;
    this.titulo = producto.titulo;
    this.descripcion = producto.descripcion;
    this.precio = producto.precio;
    this.stock = producto.stock;
    this.imagen_url = producto.imagen_url;
    this.id_categoria = producto.id_categoria;
}

Producto.getAll = (result) => {
    // Aquí hacemos la fusión con la tabla categorías para ver el nombre
    const query = `
        SELECT p.*, c.nombre_categoria 
        FROM productos p 
        INNER JOIN categorias c ON p.id_categoria = c.id_categoria`;
    
    sql.query(query, (err, results) => {
        if (err) { result(err, null); return; }
        result(null, results);
    });
}

Producto.findById = (id, result) => {
    sql.query("SELECT * FROM productos WHERE id_libro = ?", [id], (err, res) => {
        if (err) { result(err, null); return; }
        if (res.length) { result(null, res[0]); return; }
        result({ kind: "not_found" }, null);
    });
};

Producto.create = (newProducto, result) => {
    sql.query("INSERT INTO productos SET ?", newProducto, (err, res) => {
        if (err) { result(err, null); return; }
        result(null, { id: res.insertId, ...newProducto });
    });
}

Producto.updateById = (id, nuevoProducto, result) => {
    sql.query(
        "UPDATE productos SET titulo = ?, descripcion = ?, precio = ?, stock = ?, imagen_url = ?, id_categoria = ? WHERE id_producto = ?",
        [ nuevoProducto.titulo, nuevoProducto.descripcion, nuevoProducto.precio, nuevoProducto.stock, nuevoProducto.imagen_url, nuevoProducto.id_categoria, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            // Devolvemos el objeto completo con el ID para la respuesta
            result(null, { id_producto: id, ...nuevoProducto });
        }
    );
};

Producto.remove = (id, result) => {
    sql.query("DELETE FROM productos WHERE id_producto = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Producto eliminado con id: ", id);
        result(null, res);
    });
};

module.exports = Producto;