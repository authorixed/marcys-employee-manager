const inquirer = require('inquirer');
const { 
    getAllDepartments, 
    getAllRoles, 
    getAllEmployees, 
    addDepartment, 
    addRole, 
    addEmployee 
} = require('./db/queries');
require('console.table'); // To display data in a table format

// Main menu function to show different options
const mainMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Exit'
        ]
    }).then((answer) => {
        switch (answer.action) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                promptAddDepartment();
                break;
            case 'Add a role':
                promptAddRole();
                break;
            case 'Add an employee':
                promptAddEmployee();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
                break;
        }
    });
};

// Function to view all departments
const viewDepartments = async () => {
    try {
        const departments = await getAllDepartments();
        if (departments.length === 0) {
            console.log("No departments found.");
        } else {
            console.table(departments);  // Display departments in table format
        }
        mainMenu();  // Go back to the main menu
    } catch (error) {
        console.error('Error retrieving departments:', error);
        mainMenu();
    }
};

// Function to view all roles
const viewRoles = async () => {
    try {
        const roles = await getAllRoles();
        if (roles.length === 0) {
            console.log("No roles found.");
        } else {
            console.table(roles);  // Display roles in table format
        }
        mainMenu();  // Go back to the main menu
    } catch (error) {
        console.error('Error retrieving roles:', error);
        mainMenu();
    }
};

// Function to view all employees
const viewEmployees = async () => {
    try {
        const employees = await getAllEmployees();
        if (employees.length === 0) {
            console.log("No employees found.");
        } else {
            console.table(employees);  // Display employees in table format
        }
        mainMenu();  // Go back to the main menu
    } catch (error) {
        console.error('Error retrieving employees:', error);
        mainMenu();
    }
};

// Prompt to add a new department
const promptAddDepartment = () => {
    inquirer.prompt({
        name: 'name',
        message: 'Enter the name of the new department:'
    }).then(async (answer) => {
        try {
            const department = await addDepartment(answer.name);
            console.log(`Added department: ${department.name}`);
            mainMenu();
        } catch (error) {
            console.error('Error adding department:', error);
            mainMenu();
        }
    });
};

// Prompt to add a new role
const promptAddRole = async () => {
    const departments = await getAllDepartments();
    const departmentChoices = departments.map(department => ({
        name: department.name,
        value: department.id
    }));

    inquirer.prompt([
        { name: 'title', message: 'Enter the title of the role:' },
        { name: 'salary', message: 'Enter the salary for the role:' },
        { 
            type: 'list', 
            name: 'department_id', 
            message: 'Select the department for the role:', 
            choices: departmentChoices 
        }
    ]).then(async (answers) => {
        try {
            const role = await addRole(answers.title, answers.salary, answers.department_id);
            console.log(`Added role: ${role.title}`);
            mainMenu();
        } catch (error) {
            console.error('Error adding role:', error);
            mainMenu();
        }
    });
};

// Prompt to add a new employee
const promptAddEmployee = async () => {
    const roles = await getAllRoles();
    const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
    }));

    const employees = await getAllEmployees();
    const managerChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    inquirer.prompt([
        { name: 'first_name', message: 'Enter the employee\'s first name:' },
        { name: 'last_name', message: 'Enter the employee\'s last name:' },
        { 
            type: 'list', 
            name: 'role_id', 
            message: 'Select the employee\'s role:', 
            choices: roleChoices 
        },
        { 
            type: 'list', 
            name: 'manager_id', 
            message: 'Select the employee\'s manager:', 
            choices: [{ name: 'None', value: null }].concat(managerChoices) 
        }
    ]).then(async (answers) => {
        try {
            const employee = await addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
            console.log(`Added employee: ${employee.first_name} ${employee.last_name}`);
            mainMenu();
        } catch (error) {
            console.error('Error adding employee:', error);
            mainMenu();
        }
    });
};

// Start the application by displaying the main menu
mainMenu();
