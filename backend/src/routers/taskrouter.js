const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../controllers/taskControllers");

// Route to get all tasks
router.get("/", browse);

// // Route to get a task by id
router.get("/:id", read);

// Route to add a task
router.post("/", add);

// Route to edit a task
router.put("/:id", edit);

// // Route to delete a task
router.delete("/:id", destroy);

module.exports = router;
