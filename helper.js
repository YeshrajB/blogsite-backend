const { default: mongoose } = require("mongoose");
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const Role = require("./models/role");

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
  User.insertMany([
    {
        "username": "Glenn Acosta",
        "email": "glennacosta@digigene.com",
        "role": "editor",
        "password": bcrypt.hashSync("password", 10),
        "about": "Nisi magna excepteur laborum eu incididunt ea excepteur proident dolor. Fugiat sunt aute sit cillum ipsum esse adipisicing reprehenderit nostrud. Sit esse ad quis ea.\r\n",
        "isActive": true,
    },
    {
      "isActive": false,
      "username": "Arline Ball",
      "role": "editor",
      "password": bcrypt.hashSync("password", 10),
      "email": "arlineball@digigene.com",
      "about": "Sunt non voluptate enim eu occaecat officia enim ex excepteur tempor. Culpa reprehenderit do commodo incididunt. Et nulla esse cillum et proident cillum proident quis deserunt. Reprehenderit cillum laboris minim cupidatat. Commodo irure irure nulla aute aliquip eiusmod sit. Irure minim ad irure dolore non enim commodo culpa veniam cillum laborum pariatur.\r\n",
    },
    {
      "isActive": true,
      "username": "Byers Alston",
      "role": "user",
      "email": "byersalston@digigene.com",
      "password": bcrypt.hashSync("password", 10),
      "about": "Quis pariatur sunt cupidatat consequat nostrud sunt officia laboris do quis in nulla consequat Lorem. Sint et id consequat esse enim veniam tempor reprehenderit sint eu occaecat aliquip non aute. Excepteur reprehenderit eiusmod eu ut magna.\r\n",
    },
    {
      "isActive": false,
      "username": "Anastasia Cardenas",
      "role": "user",
      "password": bcrypt.hashSync("password", 10),
      "email": "anastasiacardenas@digigene.com",
      "about": "Irure id minim in pariatur veniam ut Lorem sit est incididunt incididunt ipsum. Deserunt duis aliquip incididunt enim aute voluptate proident qui voluptate mollit occaecat in. Mollit laborum ut est nulla sint magna deserunt duis exercitation do labore sit eu veniam.\r\n",
    },
    {
      "isActive": true,
      "username": "Odonnell Salinas",
      "password": bcrypt.hashSync("password", 10),
      "role": "user",
      "email": "odonnellsalinas@digigene.com",
      "about": "Fugiat dolore laborum aute labore laborum reprehenderit dolor laborum sunt nostrud nostrud sint. Est veniam irure velit labore adipisicing exercitation elit. Eu cupidatat consequat do non quis aliquip excepteur laborum culpa enim anim officia. Eiusmod consectetur id dolor ullamco aliqua culpa.\r\n",
    }
  ]);

  Role.insertMany([
    { name: 'admin', description: 'Full system access', },
    { name: 'editor', description: 'Content management' },
    { name: 'author', description: 'Create and manage own content' },
    { name: 'user', description: 'Basic read access' },
  ])
}

module.exports = { connectDB, insertDummyData }