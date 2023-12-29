DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS tasks;
CREATE TABLE categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE status (
  id INT NOT NULL AUTO_INCREMENT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`id`)
);

CREATE TABLE tasks (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) NULL,
  category_id INT NULL,
  status_id INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (status_id) REFERENCES status(id)
);