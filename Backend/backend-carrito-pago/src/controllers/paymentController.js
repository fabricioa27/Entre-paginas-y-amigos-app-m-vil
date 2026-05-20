const CartModel = require('../models/cartModel');
const OrderModel = require('../models/orderModel');

exports.checkout = (req, res) => {
    const {
        customerName,
        customerEmail,
        phone,
        address,
        paymentMethod
    } = req.body;

    if (!customerName || !customerEmail || !phone || !address || !paymentMethod) {
        return res.status(400).json({
            success: false,
            message: 'Nombre, correo, teléfono, dirección y método de pago son obligatorios'
        });
    }

    if (paymentMethod !== 'contra_entrega' && paymentMethod !== 'tarjeta') {
        return res.status(400).json({
            success: false,
            message: 'Método de pago no válido. Usa contra_entrega o tarjeta'
        });
    }

    CartModel.getCart((error, cartItems) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al consultar el carrito',
                error: error.message
            });
        }

        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El carrito está vacío'
            });
        }

        const total = cartItems.reduce((acc, item) => acc + Number(item.subtotal), 0);

        const order = {
            customerName,
            customerEmail,
            phone,
            address,
            paymentMethod,
            total,
            status: paymentMethod === 'tarjeta' ? 'pagado_simulado' : 'pendiente_entrega'
        };

        OrderModel.createOrder(order, (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al crear la orden',
                    error: error.message
                });
            }

            const orderId = result.insertId;
            let insertedDetails = 0;

            cartItems.forEach((item) => {
                const detail = {
                    orderId,
                    bookId: item.book_id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    subtotal: item.subtotal
                };

                OrderModel.createOrderDetail(detail, (error) => {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            message: 'Error al guardar el detalle de la orden',
                            error: error.message
                        });
                    }

                    insertedDetails++;

                    if (insertedDetails === cartItems.length) {
                        CartModel.clearCart((error) => {
                            if (error) {
                                return res.status(500).json({
                                    success: false,
                                    message: 'La orden fue creada, pero no se pudo vaciar el carrito',
                                    error: error.message
                                });
                            }

                            res.status(201).json({
                                success: true,
                                message: paymentMethod === 'tarjeta'
                                    ? 'Pago con tarjeta simulado correctamente'
                                    : 'Pedido creado para pago contra entrega',
                                data: {
                                    orderId,
                                    customerName,
                                    customerEmail,
                                    phone,
                                    address,
                                    paymentMethod,
                                    total,
                                    status: order.status,
                                    products: cartItems
                                }
                            });
                        });
                    }
                });
            });
        });
    });
};

exports.getOrders = (req, res) => {
    OrderModel.getOrders((error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al obtener las órdenes',
                error: error.message
            });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
};

exports.getOrderDetails = (req, res) => {
    const { orderId } = req.params;

    OrderModel.getOrderDetails(orderId, (error, results) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Error al obtener el detalle de la orden',
                error: error.message
            });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
};
