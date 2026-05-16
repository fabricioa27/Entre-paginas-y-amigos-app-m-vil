const ProductoModel = require('../models/producto.model');
const response = require('../helpers/response');

const validateProductFields = (body) => {
    const errors = [];
    if (!body.titulo || body.titulo.trim().length < 2) {
        errors.push('El título del producto es requerido.');
    }
    if (isNaN(body.precio) || body.precio <= 0) {
        errors.push('El precio debe ser un número mayor a 0.');
    }
    if (isNaN(body.stock) || body.stock < 0) {
        errors.push('El stock no puede ser negativo.');
    }
    if (!body.id_categoria) {
        errors.push('La categoría es obligatoria.');
    }
    return errors;
};

// 1. Obtener todos los productos
exports.findAll = (req, res) => {
    ProductoModel.getAll((err, data) => {
        if (err) return response.error(res, 'Error al obtener productos', 500);
        return response.success(res, data, 'Productos obtenidos');
    });
};

// 2. Crear un producto
exports.create = (req, res) => {
    if (!req.body) return response.error(res, 'Datos vacíos', 400);

    const nuevoProducto = new ProductoModel({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        imagen_url: req.body.imagen_url,
        id_categoria: req.body.id_categoria
    });

    ProductoModel.create(nuevoProducto, (err, data) => {
        if (err) return response.error(res, 'Error al crear producto', 500);
        return response.success(res, data, 'Producto creado', 201);
    });
};

// 3. Buscar por ID
exports.findOne = (req, res) => {
    ProductoModel.findById(req.params.id, (err, data) => {
        if (err) return response.error(res, 'No se encontró el producto', 404);
        return response.success(res, data, 'Producto encontrado');
    });
};

// 4. Editar
exports.update = (req, res) => {
    // Validar que el cuerpo no esté vacío
    if (!req.body) {
        return response.error(res, "El contenido no puede estar vacío", 400);
    }

    const id = req.params.id;
    
    // Creamos el objeto con los datos actualizados
    const productoEditado = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        imagen_url: req.body.imagen_url,
        id_categoria: req.body.id_categoria
    };

    ProductoModel.updateById(id, productoEditado, (err, data) => {
        if (err) {
            // Si hay error, usamos el formato de error de la guía
            return response.error(res, "No se pudo actualizar el producto", 500);
        }
        const respuestaBonita = {
            id_producto: id,
            titulo: productoEditado.titulo,
            descripcion: productoEditado.descripcion,
            precio: productoEditado.precio,
            stock: productoEditado.stock,
            imagen_url: productoEditado.imagen_url,
            id_categoria: productoEditado.id_categoria
        };

        return response.success(res, respuestaBonita, "Producto actualizado con éxito");
    });
};

// 5. Eliminar
exports.delete = (req, res) => {
    ProductoModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return response.error(res, `No se encontró el producto con id ${req.params.id}`, 404);
            }
            return response.error(res, "Error al eliminar el producto", 500);
        }
        return response.success(res, null, "Producto eliminado con éxito");
    });
};