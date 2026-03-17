require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbconnect');
const verifyJWT = require('./middleware/verifyJWT');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const credentials = require('./middleware/credentials');  // Note: create this simple middleware next if needed, but for now assume

const app = express();
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');  // temp, use cors later
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', authRouter);
app.use('/api/users', verifyJWT, usersRouter);
app.use(express.static('public'));

app.all('*', (req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

