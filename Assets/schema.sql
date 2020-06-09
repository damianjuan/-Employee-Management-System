DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30), 
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT, 
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (id, name)
VALUES ("1", "Front End");

INSERT INTO department (id, name)
VALUES ("2", "Back End");

INSERT INTO role (id, title, salary, department_id)
VALUES ("1", "Front End Manager", "100", "1");

INSERT INTO role (id, title, salary, department_id)
VALUES ("2", "Back End Manager", "100", "2");

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES ("11", "Juan", "Damian", "1");


INSERT INTO employee (id, first_name, last_name, role_id)
VALUES ("22", "Ricky", "Reeves", "2");

