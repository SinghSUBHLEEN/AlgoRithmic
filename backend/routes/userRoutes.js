const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();
router.post("/checker", userController.checker);
router.post("/findIfSolved", userController.findIfSolved);
module.exports = router;
