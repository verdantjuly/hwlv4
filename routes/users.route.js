const express = require("express");
const router = express.Router();

const UsersController = requie("../controllers/users.controller.js");
const usersController = new UsersController();

module.exports = router;
