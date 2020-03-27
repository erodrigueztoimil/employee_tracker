/*
user options
view all employees
view all employees by department
view all employees by manager
add employee
remove employee
update employee role
epdate employee manager
*/

/*
departments
sales
engineering
finance
legal
*/

/*
employee roles
sales lead
salesperson
lead engineer
software engineer
account manager
accountant
legal team lead
*/

/*
managers name
John Doe
Mike Chan
Ashley Rodriguez
Kevin Tupik
Malia Brown
Sarah Lourd
Tom Allen
*/

const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "employee_tracker"
});

connection.connect(err => {
  if (err) throw err;

  getUserInput();
});

function getUserInput() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager"
      ]
    })
    .then(choice => {
      switch (choice.action) {
        case "View all employees":
          getEmployees();
          break;

        case "View all employees by department":
          console.log("option");
          break;

        case "View all employees by manager":
          console.log("option");
          break;

        case "Add employee":
          console.log("option");
          break;

        case "Remove employee":
          console.log("option");
          break;

        case "Update employee role":
          console.log("option");
          break;

        case "Update employee manager":
          console.log("option");
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}

function getEmployees() {
  connection.query("SELECT * FROM employee", (err, response) => {
    if (err) throw err;
    console.table(response);
  });

  getUserInput();
}
