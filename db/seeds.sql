USE employee_tracker;

-- add departments
INSERT INTO department (name) VALUES ('sales');
INSERT INTO department (name) VALUES ('engineering');
INSERT INTO department (name) VALUES ('finance');
INSERT INTO department (name) VALUES ('legal');

-- add roles
INSERT INTO role (title, salary, department_id) VALUES ('Sales Lead', 10.5, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Salesperson', 9.5, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', 11, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 11, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Account Manager', 10, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 9.9, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Legal Team Lead', 11, 4);

-- add employee managers
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Tom', 'Allen', 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Lourd', 3, 3);