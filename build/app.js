const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
    if (req.hostname.startsWith('www.')) {
        const newUrl = `https://${req.hostname.slice(4)}${req.originalUrl}`;
        return res.redirect(301, newUrl);
    }
    next();
});

const indexRoutes = require('./routes/index.routes.js');
const aiRoutes = require('./routes/ai.routes.js');
const mobileRoutes = require('./routes/mobile.routes.js');
const webRoutes = require('./routes/web.routes.js');
const contactRoutes = require('./routes/contact.routes.js');
const aboutRoutes = require('./routes/about.routes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname)));

app.use('/', indexRoutes);
app.use('/', aiRoutes);
app.use('/', mobileRoutes);
app.use('/', webRoutes);
app.use('/', contactRoutes);
app.use('/', aboutRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});