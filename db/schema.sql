CREATE DATABASE employee_tracker;

CREATE TABLE IF NOT EXISTS `employee_tracker`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `role_id` INT NULL,
  `manager_id` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `employee_tracker`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `salary` VARCHAR(45) NOT NULL,
  `department_id` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `employee_tracker`.`department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`));