const { Router } = require("express");
const problemController = require("../controllers/problemControllers");
const router = Router();
router.post("/addProblem", problemController.addProblem);
router.get("/getProblems/:id", problemController.findAllProblems);
router.post("/markProblem/:id/:pid", problemController.checker);
module.exports = router;
