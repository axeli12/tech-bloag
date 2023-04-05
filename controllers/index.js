const router = require('express').Router();
const  apiRoute = require('./api')

router.use('/', apiRoute);

router.use((req, res) => {
    res.render('404')
});

module.exports = router;