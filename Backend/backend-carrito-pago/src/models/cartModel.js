const db = require('../config/db');

exports.addItem = (item, callback) => {
    const sql = `
        INSERT INTO cart
        (book_id, title, price, quantity, subtotal)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        item.bookId,
        item.title,
        item.price,
        item.quantity,
        item.subtotal
    ], callback);
};

exports.getCart = (callback) => {
    const sql = `
        SELECT * FROM cart
        ORDER BY created_at DESC
    `;

    db.query(sql, callback);
};

exports.removeItem = (id, callback) => {
    const sql = `
        DELETE FROM cart
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

exports.clearCart = (callback) => {
    const sql = `DELETE FROM cart`;

    db.query(sql, callback);
};
