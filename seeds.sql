INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('HR');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 75000, 1),
('Engineer', 90000, 2),
('HR Specialist', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Tom', 'Brown', 3, NULL);
