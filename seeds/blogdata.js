const { Blog } = require('../models')

const blogData = [
    {
        blog_title: "CSS",
        blog_content: "CSS is styling for frontend applications",
        blog_created: "Saturday, June 10"

    },
]

const seedData = () => Blog.bulkCreate(blogData)

module.exports = seedData;