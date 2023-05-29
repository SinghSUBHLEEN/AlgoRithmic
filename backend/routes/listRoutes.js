const { Router } = require("express");
const listController = require("../controllers/listController");
const router = Router();
router.post("/createList", listController.createList);
router.post("/addToList/:listId/:problemId", listController.addToList);
router.post("/deleteList/:listId", listController.deleteList);
router.post(
  "/deleteProblemFromList/:listId/:problemId",
  listController.deleteProblemFromList
);
router.post("/getList/:id", listController.getList);
router.post("/getListForHomePage/:id", listController.getListForHomePage);
module.exports = router;
