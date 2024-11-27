const { default: mongoose } = require("mongoose");
const User = require('./models/user');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const Role = require("./models/role");
const Post = require("./models/post");
const { Permission } = require("./models/permission");
const jsonFilePath = './dummyData.json';

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/nerdblog`);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
}

const insertDummyData = async () => {
    const jsonData = fs.readFileSync(jsonFilePath);
    const data = JSON.parse(jsonData.toString());

    if (data.users && Array.isArray(data.users)) {
      const userData = data.users.map((user) => ({
        ...user, password: bcrypt.hashSync(user.password, 10)
      }));
      const usersResult = await User.insertMany(userData);
      console.log(`${usersResult.length} users inserted.`);
    }
  
    if (data.roles && Array.isArray(data.roles)) {
        const rolesResult = await Role.insertMany(data.roles);
        console.log(`${rolesResult.length} roles inserted`);
    }

    if (data.posts && Array.isArray(data.posts)) {
        const postsResult = await Post.insertMany(data.posts);
        console.log(`${postsResult.length} posts inserted.`);
    }

    if (data.permissions && Array.isArray(data.permissions)) {
        const permissionsResult = await Permission.insertMany(data.permissions);
        console.log(`${permissionsResult.length} permissions inserted.`);
    }
}

module.exports = { connectDB, insertDummyData }