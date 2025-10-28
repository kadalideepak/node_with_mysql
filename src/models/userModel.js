const db = require("../../config/db");

// Create user table if not exists
// db.query(
//   `
//   CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255),
//     email VARCHAR(255),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   )
// `,
//   (err) => {
//     if (err) throw err;
//     console.log("✅ User table ready");
//   }
// );

module.exports = {
  createUser: (
    name,
    email,
    username,
    phone,
    dob,
    gender,
    address,
    callback
  ) => {
    const sql = `
    INSERT INTO users 
    (name, email, username, phone, dob, gender, address) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
    db.query(
      sql,
      [name, email, username, phone, dob, gender, address],
      callback
    );
  },

  getUsers: (callback) => {
    db.query("SELECT * FROM users", callback);
  },
  updateUser: (
    id,
    name,
    email,
    username,
    phone,
    dob,
    gender,
    address,
    status,
    callback
  ) => {
    const sql = `
    UPDATE users 
    SET name=?, email=?, username=?, phone=?, dob=?, gender=?, address=?, status=? 
    WHERE id=?
  `;
    db.query(
      sql,
      [name, email, username, phone, dob, gender, address, status, id],
      callback
    );
  },

  deleteUser: (id, callback) => {
    db.query("DELETE FROM users WHERE id=?", [id], callback);
  },
  getUserById: (id, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  },
  getUsersByStatus: (status, callback) => {
    db.query("SELECT * FROM users WHERE status = ?", [status], callback);
  },
  getUsersByGender: (gender, callback) => {
    db.query("SELECT * FROM users WHERE gender = ?", [gender], callback);
  },
};
