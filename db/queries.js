const pool = require('./connection');

// Fetch all departments
const getAllDepartments = async () => {
  const res = await pool.query('SELECT * FROM department');
  return res.rows;
};

// Fetch all roles
const getAllRoles = async () => {
  const res = await pool.query(`
    SELECT role.id, role.title, role.salary, department.name AS department 
    FROM role 
    JOIN department ON role.department_id = department.id
  `);
  return res.rows;
};

// Fetch all employees
const getAllEmployees = async () => {
  const res = await pool.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
    COALESCE(manager.first_name || ' ' || manager.last_name, 'None') AS manager 
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id 
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `);
  return res.rows;
};

// Add a new department
const addDepartment = async (name) => {
  const res = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
  return res.rows[0];
};

// Add a new role
const addRole = async (title, salary, department_id) => {
  const res = await pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
    [title, salary, department_id]
  );
  return res.rows[0];
};

// Add a new employee
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  const res = await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [first_name, last_name, role_id, manager_id]
  );
  return res.rows[0];
};

// Export all functions
module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,      // Export the function for adding a department
  addRole,            // Export the function for adding a role
  addEmployee,        // Export the function for adding an employee
};
