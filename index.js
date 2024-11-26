require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const roleRouter = require('./routes/roles');
const { connectDB, insertDummyData } = require('./helper');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/roles', roleRouter);

app.listen(port, () => console.log('App listening on port', port));

connectDB();
// insertDummyData();