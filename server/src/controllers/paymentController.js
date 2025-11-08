const axios = require("axios");
const FormData = require("form-data");
const User = require('../models/User');

exports.createPayment = async (req, res) => {
    try {
        const { name, _id, amount, email, mobile } = req.body;

        // Validate required fields
        if (!name || !_id || !amount || !email || !mobile) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: name, _id, amount, email, mobile",
            });
        }

        // Set redirect URL
        const redirectUrl = `${process.env.NEXT_PUBLIC_APP_FRONTEND_URL}/dashboard/payment_status`;
        const ipnUrl =`${process.env.NEXT_PUBLIC_APP_FRONTEND_URL}/api/payment/ipn`;

       

        const form = new FormData();
        form.append("fee", "icap2025");
        form.append("name", name);
        form.append("reg", _id);
        form.append("amount", amount);
        form.append("email", email);
        form.append("mobile", mobile);
        form.append("ipn_url", ipnUrl);
        form.append("redirect_url", redirectUrl);

        const response = await axios.post(
            "https://epayment.sust.edu/api/payment/create/external",
            form,
            {
                headers: {
                    "Content-Type":
                    "multipart/form-data; boundary=---011000010111000001101001",
                    "User-Agent": "insomnia/10.3.0",
                    ...form.getHeaders(),
                    Authorization: `Bearer ${process.env.PAYMENT_API_TOKEN}`,
                },
            }
        );

        // console.log(response.data);

        const user = await User.findById(_id);
        user.transactionHistory.push({
            paymentID: response.data.data.paymentID,
            amount: amount,
            payment_status: "PENDING",
            payment_date: new Date()
        });
        await user.save();

        return res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error("Payment creation error:", error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: "Payment creation failed",
            error: error.response?.data || error.message,
        });
    }
};

exports.handleIPN = async (req, res) => {
    try {
        const { paymentID, amount, status, payment_date } = req.body;
        const auth = req.headers.authorization;
        console.log('header ' + auth);

        if (auth !== `Bearer ${process.env.PAYMENT_API_TOKEN}`) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        console.log("IPN received:", req.body);
        // const user = await User.findOne({ _id: req.body.reg || req.body._id });

        // if (!user) {
        //     console.error("User not found for registration:", req.body.reg || req.body._id);
        //     return res.status(404).json({ message: "User not found" });
        // }

        // // Add transaction details to array
        // user.transactionHistory.push({
        //     paymentID: paymentID,
        //     amount: amount,
        //     payment_status: status,
        //     payment_date: payment_date || new Date()
        // });

        // // If payment is successful, save the paymentID
        // if (status === "SUCCESS") {
        //     user.SuccessPaymentID = paymentID;
        //     user.payment_status = true;
        //     user.payment_date = payment_date || new Date();
        //     user.amount = amount;
        // }

        // await user.save();
        // console.log("User payment details updated successfully");

        return res.json({ received: true });
    } catch (error) {
        console.error("IPN processing error:", error.message);
        return res.status(500).json({ message: "IPN processing failed" });
    }
};

exports.getPaymentStatus = async (req, res) => {
    try {
        const { paymentID, _id } = req.body;

        if (!paymentID) {
            return res.status(400).json({
                success: false,
                message: "Payment ID is required"
            });
        }

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        console.log('Fetching payment status for:', { paymentID, _id });

        const response = await axios.post(
            `https://epayment.sust.edu/api/payment/status/${paymentID}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYMENT_API_TOKEN}`
                }
            }
        );

        // console.log('Payment gateway response:', response.data);

        const paymentData = response.data;

        const paymentStatus = paymentData?.paymentStatusCode;
        // console.log('paymetn status' + paymentStatus);

        // Update user payment information
        const user = await User.findOne({ _id });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Find and update transaction in history
        const transaction = user.transactionHistory.find(tx => tx.paymentID === paymentID);
        if (transaction && transaction.payment_status !== 'PAID') {
            transaction.payment_status = paymentStatus;
            transaction.payment_date = new Date();
        
        // If payment is successful (PAID stat
        if (paymentStatus === 'PAID' ){
            user.SuccessPaymentID = paymentID;
            user.payment_status = true;
            user.payment_date = new Date();
            user.amount = parseFloat(paymentData?.paymentAmount) || user.amount;

            console.log('Payment successful - User updated:', {
                userId: user._id,
                paymentID,
                amount: user.amount
            });
        }

        await user.save(); 
         return res.status(200).json({
            success: true,
            status: paymentStatus,
            payment_date: user.payment_date,
            message: paymentData?.message || 'Payment status retrieved',
            data: response.data
        });
    }
      
    }

    catch (error) {
        console.error("Payment status error:", error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch payment status",
            error: error.response?.data || error.message
        });
    }
};