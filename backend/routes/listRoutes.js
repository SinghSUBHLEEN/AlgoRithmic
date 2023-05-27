const { Router } = require("express");
const listController = require("../controllers/listController");
const router = Router();
router.post("/createList", listController.createList);
router.post("/addToList", listController.addToList);
router.post("/deleteList", listController.deleteList);
router.post("/deleteProblemFromList", listController.deleteProblemFromList);
module.exports = router;
