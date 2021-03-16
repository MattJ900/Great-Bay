DROP DATABASE IF EXISTS greatBayDB;

CREATE DATABASE greatBayDB;

USE greatBayDB;

-- //category, item, bid amount, 

CREATE TABLE marketPlace (
  id INT NOT NULL AUTO_INCREMENT,

  item VARCHAR(45) NOT NULL,
  bid amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(45) NOT NULL,

  PRIMARY KEY (id)
);

