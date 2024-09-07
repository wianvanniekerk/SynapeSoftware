const express = require('express');
const router = express.Router();

router.get('/web', (req, res) => {
    try {
        res.render('web');
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred');
    }
});

module.exports = router;