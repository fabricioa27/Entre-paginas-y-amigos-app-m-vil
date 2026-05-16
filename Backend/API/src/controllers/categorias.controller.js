const Categoria = require("../models/categoria.model");
const response = require("../helpers/response");

exports.findAll = (req, res) => {
    Categoria.getAll((err, data) => {
        if (err) return response.error(res, "Error al obtener categorías.", 500);
        return response.success(res, data, "Categorías obtenidas.");
    });
};

exports.findOne = (req, res) => {
    Categoria.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") return response.error(res, "No existe esa categoría.", 404);
            return response.error(res, "Error al buscar la categoría.", 500);
        }
        return response.success(res, data, "Categoría encontrada.");
    });
};

exports.create = (req, res) => {
    if (!req.body || !req.body.nombre_categoria) {
        return response.error(res, "El nombre de la categoría es obligatorio.", 400);
    }

    const nuevaCategoria = new Categoria({
        nombre_categoria: req.body.nombre_categoria
    });

    Categoria.create(nuevaCategoria, (err, data) => {
        if (err) return response.error(res, "Error al guardar la categoría.", 500);
        return response.success(res, data, "Categoría creada con éxito.", 201);
    });
};

exports.update = (req, res) => {
    if (!req.body || !req.body.nombre_categoria) {
        return response.error(res, "El nombre de la categoría es obligatorio.", 400);
    }

    Categoria.updateById(req.params.id, req.body.nombre_categoria, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return response.error(res, `No se encontró la categoría con id ${req.params.id}`, 404);
            }
            return response.error(res, "Error al actualizar la categoría", 500);
        }
        return response.success(res, data, "Categoría actualizada con éxito");
    });
};