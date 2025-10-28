const Booking = require("../models/bookingModel");

// Helper to generate booking code
function generateBookingCode() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
  return `BOOK${yyyy}${mm}${dd}-${randomNum}`;
}

exports.addBooking = (req, res) => {
  const {
    booking_date,
    start_date,
    end_date,
    quantity,
    total_price,
    status,
    user_id,
    product_id,
  } = req.body;

  const booking_code = generateBookingCode();

  Booking.createBooking(
    booking_code,
    booking_date,
    start_date,
    end_date,
    quantity,
    total_price,
    status,
    user_id,
    product_id,
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({
        message: "Booking created successfully",
        booking_code,
        data: result,
      });
    }
  );
};

exports.getAllBookings = (req, res) => {
  Booking.getAllBookings((err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
};

exports.getBookingById = (req, res) => {
  const { id } = req.params;

  Booking.getBookingById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0)
      return res
        .status(404)
        .json({ message: `Booking with ID ${id} not found` });
    res.status(200).json(results[0]);
  });
};

exports.updateBooking = (req, res) => {
  const { id } = req.params;
  const {
    booking_date,
    start_date,
    end_date,
    quantity,
    total_price,
    status,
    user_id,
    product_id,
  } = req.body;

  Booking.updateBooking(
    id,
    booking_date,
    start_date,
    end_date,
    quantity,
    total_price,
    status,
    user_id,
    product_id,
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).json({ message: "Booking updated successfully" });
    }
  );
};

exports.deleteBooking = (req, res) => {
  const { id } = req.params;

  Booking.deleteBooking(id, (err, result) => {
    if (err) return res.status(500).send(err);
    res
      .status(200)
      .json({ message: `Booking with ID ${id} deleted successfully` });
  });
};
