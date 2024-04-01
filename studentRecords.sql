CREATE DATABASE student_records;
use student_records;

CREATE TABLE student_master (
    id integer PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE student_class (
    id integer PRIMARY KEY AUTO_INCREMENT,
    student_id INTEGER,
    class_name VARCHAR(255) NOT NULL,
    result VARCHAR(255) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student_master(id)
);

INSERT INTO student_master (name, email)
VALUES
('Yash Sonar', 'yashsonar@gmail.com'),
('Michael Scott', 'michaelscott@hotmail.com');

INSERT INTO student_class (student_id, class_name, result)
VALUES 
('1', 'Mathematics', 'Pass'),
('2', 'Physics', 'Fail'),
('1', 'Chemistry', 'Pass');