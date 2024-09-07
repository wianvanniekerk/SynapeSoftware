const express = require('express');
const router = express.Router();

router.get('/mobile', (req, res) => {
    try {
        res.render('mobile');
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred');
    }
});

module.exports = router;