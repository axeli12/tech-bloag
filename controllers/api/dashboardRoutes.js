const router =require ('express').Router();
const { Blog } = require('../../models');

router.get('/', async (req, res) => {
    try {
        res.render('dashboard');
        } catch (err) {
            return res.status(500).json(err);
        }
});

router.post('/', async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
        })
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;