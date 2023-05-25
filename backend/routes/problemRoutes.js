const { Router } = require("express");
const problemController = require("../controllers/problemControllers");
const router = Router();

router.post("/addProblem", problemController.addProblem);
router.get("/getProblems", problemController.findAllProblems);
module.exports = router;
