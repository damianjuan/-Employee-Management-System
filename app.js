var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    startApp();
});

startApp = () => {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add",
            "View",
            "Update"
        ]
    }).then(res => {
        switch (res.action) {
            case "Add":
                add();
                break;
            case "View":
                view();
                break;
            case "update":
                update();
                break;
        }
    });

    add = () => {
        inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to add?",
            choices: [
                "Department",
                "Role",
                "Employee"
            ]
        }).then(res => {
            switch (res.action) {
                case "Department":

                    break;
                case "Role":

                    break;
                case "Employee":

                    break;
            }
        })
    };

    view = () => {
        inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to view?",
            choices: [
                "Departments",
                "Roles",
                "Employees"
            ]
        }).then(res => {
            switch (res.action) {
                case "Departments":

                    break;
                case "Roles":

                    break;
                case "Employees":

                    break;
            }
        })
    };

    update = () => { };
};






// Build a command-line application that at a minimum allows the user to:

//   * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles

// Bonus points if you're able to:

//   * Update employee managers

//   * View employees by manager

//   * Delete departments, roles, and employees

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department