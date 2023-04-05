const router = require('express').Router();
const  apiRoute = require('./api')
const home = require('./homeroutes')

router.use('/', home);
router.use('/api', apiRoute);

router.use((req, res) => {
    res.render('404')
});

module.exports = router;