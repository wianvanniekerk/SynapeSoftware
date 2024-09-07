const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/contact', (req, res) => {
    try {
        const { email, uname, message } = req.body;
        if (!email || !uname || !message) {
            console.log('Missing required fields');
            return res.status(400).json({
                status: 'error',
                message: 'Missing required fields. Please fill out all fields.'
            });
        }
       
        let mailOptions = {
            from: 'info@wianvanniekerk.co.za',
            to: 'info@wianvanniekerk.co.za',
            subject: 'New Contact Form Submission',
            html: `
                <p><strong>Name:</strong> ${uname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
       
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.status(500).json({
                    status: 'error',
                    message: 'Failed to send email. Please try again later.'
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'Email sent successfully. We\'ll get back to you soon!'
                });
            }
        });
    } catch (e) {
        res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred. Please try again later.'
        });
    }
});

module.exports = router;