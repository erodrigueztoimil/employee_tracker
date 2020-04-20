const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "employee_tracker",
});

connection.connect((err) => {
  if (err) throw err;

  getUserInput();
});

function getUserInput() {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View Employees",
        "View Departments",
        "View Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
      ],
    })
    .then((response) => {
      switch (response.choice) {
        case "View Employees":
          getEmployees();
          break;

        case "View Departments":
          getDepartments();
          break;

        case "View Roles":
          getRoles();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        default:
          break;
      }
    });
}

function getEmployees() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON role.department_id=department.id",
    (err, response) => {
      if (err) throw err;
      console.table(response);
      getUserInput();
    }
  );
}

function getDepartments() {
  connection.query("SELECT id, department FROM department", (err, response) => {
    if (err) throw err;
    console.table(response);
    getUserInput();
  });
}

function getRoles() {
  connection.query("SELECT id, title FROM role", (err, response) => {
    if (err) throw err;
    console.table(response);
    getUserInput();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "First Name:",
      },
      {
        name: "last_name",
        message: "Last Name:",
      },
      {
        name: "role_id",
        message: "Role Id:",
      },
      {
        name: "manager_id",
        message: "Manager Id:",
      },
    ])
    .then((response) => {
      let first_name = response.first_name;
      let last_name = response.last_name;
      let role_id = parseInt(response.role_id);
      let manager_id = parseInt(response.manager_id);

      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [first_name, last_name, role_id, manager_id],
        (err, response) => {
          if (err) throw err;
          console.log("Employee Added!");
          getUserInput();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        message: "Department Name:",
      },
    ])
    .then((response) => {
      let department = response.department;

      connection.query(
        "INSERT INTO department (department) VALUES (?)",
        [department],
        (err, response) => {
          if (err) throw err;
          console.log("Department Added!");
          getUserInput();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        message: "Role Title:",
      },
      {
        name: "salary",
        message: "Salary:",
      },
      {
        name: "department_id",
        message: "Department Id:",
      },
    ])
    .then((response) => {
      let title = response.title;
      let salary = parseInt(response.salary);
      let department_id = parseInt(response.department_id);

      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [title, salary, department_id],
        (err, response) => {
          if (err) throw err;
          console.log("Role Added!");
          getUserInput();
        }
      );
    });
}

function updateEmployee() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON employee.role_id=role.id",
    (err, response) => {
      const choices = [];

      response.map((info) => {
        choices.push(`${info.first_name} ${info.last_name} - ${info.title}`);
      });

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "What employee do you want to update?",
            choices: choices,
          },
        ])
        .then((choice) => {
          inquirer
            .prompt([
              {
                name: "new_role",
                message: "Whats the new role id?",
              },
            ])
            .then((response) => {
              let employee = choice.employee.split(" ");
              let first_name = employee[0];
              let last_name = employee[1];
              let new_role_id = parseInt(response.new_role);

              connection.query(
                "UPDATE employee SET role_id=? WHERE first_name=? && last_name=?",
                [new_role_id, first_name, last_name],
                (err, response) => {
                  if (err) throw err;
                  console.log("Employee Role Updated!");
                  getUserInput();
                }
              );
            });
        });
    }
  );
}
