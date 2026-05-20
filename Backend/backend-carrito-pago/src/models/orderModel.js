const db = require('../config/db');

exports.createOrder = (order, callback) => {
    const sql = `
        INSERT INTO orders
        (customer_name, customer_email, phone, address, payment_method, total, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        order.customerName,
        order.customerEmail,
        order.phone,
        order.address,
        order.paymentMethod,
        order.total,
        order.status
    ], callback);
};

exports.createOrderDetail = (detail, callback) => {
    const sql = `
        INSERT INTO order_details
        (order_id, book_id, title, price, quantity, subtotal)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        detail.orderId,
        detail.bookId,
        detail.title,
        detail.price,
        detail.quantity,
        detail.subtotal
    ], callback);
};

exports.getOrders = (callback) => {
    const sql = `
        SELECT * FROM orders
        ORDER BY payment_date DESC
    `;

    db.query(sql, callback);
};

exports.getOrderDetails = (orderId, callback) => {
    const sql = `
        SELECT * FROM order_details
        WHERE order_id = ?
    `;

    db.query(sql, [orderId], callback);
};
