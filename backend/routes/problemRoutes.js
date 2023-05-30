const { Router } = require("express");
const problemController = require("../controllers/problemControllers");
const router = Router();
router.post("/addProblem", problemController.addProblem);
router.get("/getProblems/:token", problemController.findAllProblems);
router.post("/markProblem/:token/:pid", problemController.checker);
module.exports = router;
