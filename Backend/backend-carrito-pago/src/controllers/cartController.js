const CartModel = require('../models/cartModel');

exports.addToCart = (req, res) => {
    const { bookId, title, price, quantity } = req.body;

    if (!bookId || !title || !price || !quantity) {
        return res.status(400).json({
            success: false,
            message: 'bookId, title, price y quantity son obligatorios'
        });
    }

    if (Number(price) <= 0 || Number(quantity) <= 0) {
        return res.status(400).json({
            success: false,
            message: 'El precio y la cantidad deben ser mayores que cero'
        });
    }

    const item = {
        bookId,
        title,
        price: Number(price),
        quantity: Number(quantity),
        subtotal: Number(price) * Number(quantity)
    };

    CartModel.addItem(item, (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al agregar el libro al carrito',
                error: error.message
            });
        }

        res.status(201).json({
            success: true,
            message: 'Libro agregado al carrito',
            data: {
                id: result.insertId,
                ...item
            }
        });
    });
};

exports.getCart = (req, res) => {
    CartModel.getCart((error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al obtener el carrito',
                error: error.message
            });
        }

        const total = results.reduce((acc, item) => acc + Number(item.subtotal), 0);

        res.status(200).json({
            success: true,
            total,
            data: results
        });
    });
};

exports.removeFromCart = (req, res) => {
    const { id } = req.params;

    CartModel.removeItem(id, (error, result) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al eliminar el producto del carrito',
                error: error.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado en el carrito'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto eliminado del carrito'
        });
    });
};

exports.clearCart = (req, res) => {
    CartModel.clearCart((error) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al vaciar el carrito',
                error: error.message
            });
        }

        res.status(200).json({
            success: true,
            message: 'Carrito vaciado correctamente'
        });
    });
};
