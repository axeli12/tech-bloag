const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Blog, User, Comment } = require('../models')
// Get all blogs
router.get('/', async (req, res) => {
  try {
    const dbBLogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    }
    );
    const blogs = dbBLogData.map((blog) => blog.get({ plain: true }));
    // Serialize data so the template can read it
      res.render('home', {
        blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
   return  res.status(500).json(err);
  }
});

//  Use withAuth middleware to prevent access to dashboard page
router.get('/dashboard',withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });
    const user = userData.get({ plain: true });
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
 res.status(500).json(err);
  }
});
// Creates new comment
router.post('/edit/:id', async (req, res) => {
  try {
    const newComment = await Comment.create({
      user_id: req.session.user_id,
      ...req.body,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
// Get comment by id of user
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment','created_at','id'],
        },
      ],
    });
    const user = userData.get({ plain: true });
    const blogs = blogData.get({ plain: true });
    res.render('edit', {
      ...user,
      ...blogs,
      logged_in: true,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete comment by id
router.delete('/edit/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET sign up page
router.get('/signup', async (req, res) => {
    try {
      res.render('signup');
    } catch (err) {
   res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('log');
});

module.exports = router;