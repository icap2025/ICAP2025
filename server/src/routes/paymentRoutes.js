const express = require('express');
const { createPayment, handleIPN, getPaymentStatus } = require("../controllers/paymentController.js");
const { protect } = require("../middlewares/auth.js");

const router = express.Router();

// Protected route - create payment
router.post("/create", protect, createPayment);

// Public route - IPN callback (webhook from payment gateway)
router.post("/ipn", handleIPN);

// Protected route - get payment status
router.post("/status", getPaymentStatus);

module.exports = router;