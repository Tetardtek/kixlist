const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const tasks = await tables.task.readAll();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await tables.task.read(id);
    if (task == null) {
      res.sendStatus(404);
    } else {
      res.json(task);
    }
  } catch (err) {
    next(err);
  }
};
// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const taskId = req.params.id;

  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({
        message: "Content cannot be empty!",
      });
    }

    const {
      name,
      description,
      category_id: categoryId, // Rename category_id to categoryId
      status_id: statusId, // Rename status_id to statusId
    } = req.body;
    // Edit project information directly using projectManager
    const affectedRows = await tables.task.update(taskId, {
      name,
      description,
      categoryId,
      statusId,
    });

    if (affectedRows === 0) {
      res.status(500).json({ message: "Could not update task" });
    }

    // Fetch and return the updated project
    const editedtask = await tables.task.read(taskId);
    return res.json({ message: "Updated with success", task: editedtask });
  } catch (err) {
    next(err);
  }

  // Add a return statement at the end of the function
  return res.status(500).json({ message: "Could not update task" });
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const task = req.body;
  try {
    const insertId = await tables.task.create(task);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.task.delete(req.params.id);
    res.sendStatus(204);
    // Pass any errors to the error-handling middleware
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
