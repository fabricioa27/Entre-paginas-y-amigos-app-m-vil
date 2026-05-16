const UsuarioModel = require('../models/usuario.model');
const response = require('../helpers/response');
const bcrypt = require('bcrypt');

const parseId = (param) => {
    const id = parseInt(param, 10);
    return isNaN(id) || id < 0 ? null : id;
};

const validateUserFields = (body) => {
    const errors = [];
    if (!body.nombre_completo || body.nombre_completo.trim().length < 3) {
        errors.push('El nombre completo es requerido.');
    }
    if (!body.correo || !/^\S+@\S+\.\S+$/.test(body.correo)) {
        errors.push('El correo electrónico no es válido.');
    }
    if (!body.password || body.password.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres.');
    }
    return errors;
};

// 1. Obtener todos los usuarios
exports.findAll = (req, res) => {
    UsuarioModel.getAll((err, data) => {
        if (err) return response.error(res, 'Error al obtener usuarios', 500);
        return response.success(res, data, 'Usuarios obtenidos');
    });
};

// 2. Crear un usuario con contraseña encriptada
exports.create = async (req, res) => {
    if (!req.body) return response.error(res, 'Contenido vacío', 400);

    // Ejecutamos tus validaciones primero
    const erroresValidacion = validateUserFields(req.body);
    if (erroresValidacion.length > 0) {
        return response.error(res, erroresValidacion.join(' '), 400);
    }

    try {
        const saltRounds = 10;
        // Encriptamos el password que viene en el req.body antes de meterlo al modelo
        const passwordEncriptado = await bcrypt.hash(req.body.password, saltRounds);

        // Creamos la instancia del modelo con la contraseña YA oculta
        const nuevoUsuario = new UsuarioModel({
            nombre_completo: req.body.nombre_completo,
            correo: req.body.correo,
            password: passwordEncriptado // <-- Aquí pasamos el hash seguro
        });

        // Guardamos en la base de datos
        UsuarioModel.create(nuevoUsuario, (err, data) => {
            if (err) return response.error(res, 'Error al crear usuario', 500);
            return response.success(res, data, 'Usuario creado con éxito', 201);
        });

    } catch (error) {
        return response.error(res, 'Error al procesar la seguridad de la contraseña', 500);
    }
};

// 3. Buscar por ID
exports.findOne = (req, res) => {
    UsuarioModel.findById(req.params.id, (err, data) => {
        if (err) return response.error(res, 'No se encontró el usuario', 404);
        return response.success(res, data, 'Usuario encontrado');
    });
};

// 4. Actualizar
exports.update = (req, res) => {
    UsuarioModel.updateById(req.params.id, new UsuarioModel(req.body), (err, data) => {
        if (err) return response.error(res, 'Error al actualizar', 500);
        return response.success(res, data, 'Usuario actualizado');
    });
};

// 5. Eliminar
exports.delete = (req, res) => {
    UsuarioModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return response.error(res, `No se encontró el usuario con id ${req.params.id}`, 404);
            }
            return response.error(res, "Error al eliminar el usuario", 500);
        }
        return response.success(res, null, "Usuario eliminado con éxito");
    });
};