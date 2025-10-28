const User = require("../models/userModel");

exports.addUser = (req, res) => {
  const { name, email, username, phone, dob, gender, address } = req.body;

  User.createUser(
    name,
    email,
    username,
    phone,
    dob,
    gender,
    address,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res
        .status(201)
        .json({ message: "User added successfully", data: results });
    }
  );
};

exports.getAllUsers = (req, res) => {
  User.getUsers((err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
};

exports.updateUser = (req, res) => {
  const { name, email, username, phone, dob, gender, address, status } =
    req.body;
  const { id } = req.params;

  User.updateUser(
    id,
    name,
    email,
    username,
    phone,
    dob,
    gender,
    address,
    status,
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "User updated successfully" });
    }
  );
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  User.deleteUser(id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "User deleted successfully" });
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;

  User.getUserById(id, (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }

    res.status(200).json(results[0]); // return single user object
  });
};

exports.getUsersByStatus = (req, res) => {
  const { status } = req.params;

  // Validate status
  if (!["Active", "Inactive"].includes(status)) {
    return res
      .status(400)
      .json({ message: "Status must be Active or Inactive" });
  }

  User.getUsersByStatus(status, (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length === 0) {
      return res.status(404).json({ message: `No ${status} users found` });
    }

    res.status(200).json(results);
  });
};

exports.getUsersByGender = (req, res) => {
  const { gender } = req.params;

  // Validate gender
  if (!["Male", "Female", "Other"].includes(gender)) {
    return res
      .status(400)
      .json({ message: "Gender must be Male, Female, or Other" });
  }

  User.getUsersByGender(gender, (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length === 0) {
      return res.status(404).json({ message: `No ${gender} users found` });
    }

    res.status(200).json(results);
  });
};
