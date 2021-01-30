const { Router } = require('express');
const router = Router();

const usersController = require('../controllers/users.controller');

router.get('/', usersController.getUsers);
router.post('/signup', usersController.createUser);
router.post('/signin', usersController.loginUser);
router.get('/tasks', usersController.getTasks);
router.get('/private-tasks', usersController.verifyToken, usersController.getPrivateTasks);
router.get('/profile', usersController.verifyToken, usersController.getProfile);

module.exports = router;
