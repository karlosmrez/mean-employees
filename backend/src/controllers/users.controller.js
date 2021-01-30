const userController = {};

const jwt = require('jsonwebtoken');
const User = require('../models/User');

userController.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

userController.createUser = async (req, res) => {
    // Save user in DB
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Create token
    const token = jwt.sign({ _id: newUser._id }, 'secretKey');

    // Return it to the client
    res.status(200).json({ token });
};

userController.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).send('The email doesn´t exists');
    }
    if (user.password !== password) {
        return res.status(401).send('Wrong Password');
    }

    const token = jwt.sign({ _id: user._id }, 'secretKey');

    res.status(200).json({ token });
};

userController.getTasks = (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: '2019-11-17T20:39:05.211Z'
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: '2019-11-17T20:39:05.211Z'
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: '2019-11-17T20:39:05.211Z'
        }
    ]);
};

userController.getPrivateTasks = (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: '2019-11-17T20:39:05.211Z'
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: '2019-11-17T20:39:05.211Z'
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: '2019-11-17T20:39:05.211Z'
        }
    ]);
};

userController.getProfile = (req, res) => {
    res.send(req.userId);
};

module.exports = userController;


userController.verifyToken = function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request');
    }

    const token = req.headers.authorization.split(' ')[1];

    if (token === 'null') {
        return res.status(401).send('Unauthorized Request');
    }

    const payload = jwt.verify(token, 'secretKey');
    req.userId = payload._id;
    next();
};
