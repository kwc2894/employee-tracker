DROP DATABASE IF EXISTS employee_track;
CREATE DATABASE employee_Tracksample;

USE employee_Track;

CREATE TABLE department (
  id INT PRIMARY KEY,
  department_Name VARCHAR(30)
);
CREATE TABLE rrole (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id: INT
);

CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id: INT,
    review TEXT NOT NULL
);