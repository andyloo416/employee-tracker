const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const db = require(".");
const { listenerCount } = require("mysql2/typings/mysql/lib/Connection");
const PORT = process.env.PORT || 3000;

// connect ot the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "andyloo416",
  database: "employee_tracker_db",
});

start();

let start = () => {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee",
        "Exit",
      ],
      message: "What would you like to do?",
      name: "option",
    })
    .then((res) => {
      console.log(`you entered: ${res.option}`);

      switch (res.option) {
        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "View Department":
          viewDepartment();
          break;

        case "View Role":
          viewRole();
          break;

        case "View Employee":
          viewEmployee();
          break;

        case "Exit":
          quit();
          break;
      }
    });
};

// functions

let addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      message: "What's the name of the department?",
      name: "dept",
    })
    .then((res) => {
      connection.query("INSERT INTO department VALUES (?)", (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
};

let addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the title of the role?",
        name: "title",
      },
      {
        type: "input",
        message: "What's the salary of the role?",
        name: "salary",
      },
      {
        type: "input",
        message: "What's the department ID?",
        name: "department_id",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO role (`title`, `salary`, `department_id`) VALUES (?)",
        (err, res) => {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
};

let addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the id of the employee?",
        name: "id",
      },
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "last_name",
      },
      {
        type: "input",
        message: "What's the role id of the employee?",
        name: "role_id",
      },
      {
        type: "input",
        message: "What's the manager id of the employee?",
        name: "employee_id",
      },
    ])
    .then((res) => {
      connection.query("INSERT INTO employee VALUES (?)", (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
};

let viewDepartment = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

let viewRole = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

let viewEmployee = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

let quit = () => {
  connection.end();
  process.exit();
};
