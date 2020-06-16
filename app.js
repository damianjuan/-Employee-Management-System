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
            "Update Employee Role"
        ]
    }).then(res => {
        switch (res.action) {
            case "Add":
                add();
                break;
            case "View":
                view();
                break;
            case "Update Employee Role":
                updateRole();
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
                    addDepartment();
                    break;
                case "Role":
                    addRole();
                    break;
                case "Employee":
                    addEmployee();
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
                    viewDepartments();
                    break;
                case "Roles":
                    viewRoles();
                    break;
                case "Employees":
                    viewEmployees();
                    break;
            }
        })
    };
}

updateRole = () => {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.log("  ");
        console.log("Employees");
        console.table(res);
        console.log("  ");
    });
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.log("Roles");
        console.table(res);
        console.log("  ");

    });
    {
        inquirer.prompt([
            {
                name: "employeeID",
                type: "input",
                message: "Enter the employee ID  who's role you want to update."
            },
            {
                name: "roleID",
                type: "input",
                message: "Enter new role ID."
            }
        ]).then((answers) => {
            connection.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [answers.roleID, answers.employeeID],
                (err) => {
                    if (err) throw err;
                    console.log("Employee role updated");
                    startApp();
                }
            );
        });
    };
};


addDepartment = () => {
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "Enter department name."
        },
        {
            name: "departmentID",
            type: "input",
            message: "Enter department ID"
        }
    ]).then((answers) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                id: answers.departmentID,
                name: answers.departmentName
            },
            (err) => {
                if (err) throw err;
                console.log("Department: " + answers.departmentName + " added with ID: " + answers.departmentID);
                startApp();
            }
        )
    })
};

addRole = () => {
    inquirer.prompt([
        {
            name: "roleID",
            type: "input",
            message: "Enter role ID"
        },
        {
            name: "roleTitle",
            type: "input",
            message: "Enter role title."
        },
        {
            name: "salary",
            type: "input",
            message: "Enter salary for role."
        },
        {
            name: "departmentID",
            type: "input",
            message: "Enter ID of department role belongs to."
        }
    ]).then((answers) => {
        connection.query(
            "INSERT INTO role SET ?",
            {
                id: answers.roleID,
                title: answers.roleTitle,
                salary: answers.salary,
                department_id: answers.departmentID
            },
            (err) => {
                if (err) throw err;
                console.log("Role: " + answers.roleTitle + " added with ID: " + answers.roleID);
                startApp();
            }
        )
    })
};




addEmployee = () => {
    inquirer.prompt([
        {
            name: "employeeID",
            type: "input",
            message: "Enter employee ID"
        },
        {
            name: "firstName",
            type: "input",
            message: "Enter employee's first name."
        },
        {
            name: "LastName",
            type: "input",
            message: "Enter employee's last name."
        },
        {
            name: "roleID",
            type: "input",
            message: "Enter ID of employee's role."
        }
        // {
        //     name: "ManagerID",
        //     type: "input",
        //     message: "Enter ID of employee's manager if they have one. Otherwise press enter to continue."
        // }
    ]).then((answers) => {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                id: answers.employeeID,
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.roleID
                //manager_id: answers.ManagerID
            },
            (err) => {
                if (err) throw err;
                console.log("Employee: " + answers.firstName + " added with ID: " + answers.employeeID);
                startApp();
            }
        )
    })
};

viewDepartments = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.log("  ");
        console.log("Departments");
        console.table(res);
        console.log("  ");
        startApp();
    });
};

viewRoles = () => {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.log("  ");
        console.log("Roles");
        console.table(res);
        console.log("  ");
        startApp();
    });
};

viewEmployees = () => {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.log("  ");
        console.log("Employees");
        console.table(res);
        console.log("  ");
        startApp();
    });
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
