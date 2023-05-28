const { Router } = require("express");
const checkController = require("../controllers/checkController");
const router = Router();
router.post("/createCheck", checkController.createCheck);
router.post("/getCheck", checkController.getCheck);
module.exports = router;
