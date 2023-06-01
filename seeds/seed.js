const sequelize = require('../config/connection');
const { user, blog, comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await user.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const comment of commentData) {
    await comment.create({
      ...comment,
    })
  }
 

  process.exit(0);
};

seedDatabase();