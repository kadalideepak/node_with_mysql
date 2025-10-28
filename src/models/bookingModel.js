const db = require("../../config/db");

module.exports = {
  createBooking: (
    booking_code,
    booking_date,
    start_date,
    end_date,
    quantity,
    total_price,
    status,
    user_id,
    product_id,
    callback
  ) => {
    const sql = `
      INSERT INTO bookings 
      (booking_code, booking_date, start_date, end_date, quantity, total_price, status, user_id, product_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        booking_code,
        booking_date,
        start_date,
        end_date,
        quantity,
        total_price,
        status,
        user_id,
        product_id,
      ],
      callback
    );
  },

  getAllBookings: (callback) => {
    db.query(
      `
      SELECT b.*, u.name AS user_name, p.product_name 
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN products p ON b.product_id = p.id
    `,
      callback
    );
  },

  getBookingById: (id, callback) => {
    const sql = `
      SELECT b.*, u.name AS user_name, p.product_name 
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN products p ON b.product_id = p.id
      WHERE b.id = ?
    `;
    db.query(sql, [id], callback);
  },

  updateBooking: (
    id,
    booking_date,
    start_date,
    end_date,
    quantity,
    total_price,
    status,
    user_id,
    product_id,
    callback
  ) => {
    const sql = `
      UPDATE bookings 
      SET booking_date=?, start_date=?, end_date=?, quantity=?, total_price=?, status=?, user_id=?, product_id=?
      WHERE id=?
    `;
    db.query(
      sql,
      [
        booking_date,
        start_date,
        end_date,
        quantity,
        total_price,
        status,
        user_id,
        product_id,
        id,
      ],
      callback
    );
  },

  deleteBooking: (id, callback) => {
    db.query("DELETE FROM bookings WHERE id=?", [id], callback);
  },
};
