const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "task" });
  }

  // The C of CRUD - Create operation
  async create(task) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, description, category_id, status_id) VALUES (?, ?, ?, ?)`,
      [task.name, task.description, task.category_id, task.status_id]
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * from ${this.table} WHERE ID = ?`,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  // The U of CRUD - Update operation
  async update(id, task) {
    const { name, description, category_id, status_id } = task;
    const updateFields = [];
    const updateParams = [];

    if (name !== undefined) {
      updateFields.push("name = ?");
      updateParams.push(name);
    }
    if (description !== undefined) {
      updateFields.push("description = ?");
      updateParams.push(description);
    }
    if (category_id !== undefined) {
      updateFields.push("category_id = ?");
      updateParams.push(category_id);
    }
    if (status_id !== undefined) {
      updateFields.push("status_id = ?");
      updateParams.push(status_id);
    }

    const updateQuery = `UPDATE ${this.table} SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;
    const queryParams = [...updateParams, id];
    const [result] = await this.database.query(updateQuery, queryParams);
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = TaskManager;
