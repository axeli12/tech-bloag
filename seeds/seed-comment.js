const { Comment} = require('../models');

const commentData = [
    {
        comment: "Best framework ever!!!",
    },
];
const seedCommentData = () => Comment.bulkCreate(commentData);

module.exports = seedCommentData;