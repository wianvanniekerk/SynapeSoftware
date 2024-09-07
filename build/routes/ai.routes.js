const express = require('express');
const router = express.Router();

router.get('/ai', (req, res) => {
    try {
        res.render('ai');
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred');
    }
});

module.exports = router;