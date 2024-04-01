import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// Student Master Table Operations
export async function getStudents() {
    const [students] = await pool.query("SELECT * FROM student_master");
    return students
}

export async function getStudent(id) {
    const [student] = await pool.query("SELECT * FROM student_master WHERE id = ?", [id])
    return student[0]
}

export async function createStudent(name, email) {
    // Check if the student already exists
    const [existingStudents] = await pool.query("SELECT * FROM student_master WHERE name = ? AND email = ?", [name, email]);
    if (existingStudents.length > 0) {
        // If the student already exists, return the existing student
        return existingStudents[0];
    } else {
        // If the student does not exist, insert a new student
        const [createdStudent] = await pool.query(`
        INSERT INTO student_master (name, email)
        VALUES (?, ?)
        `, [name, email]);
        return getStudent(createdStudent.insertId);
    }
}

// Student Class Table Operations
export async function getClasses() {
    const [classes] = await pool.query("SELECT * FROM student_class");
    return classes
}

export async function getClass(id) {
    const [student] = await pool.query("SELECT * FROM student_class WHERE id = ?", [id])
    return student[0]
}

// Student Class Table Operations
export async function createClass(student_id, class_name, result) {
    // Check if the class entry already exists for the student
    const [existingClasses] = await pool.query("SELECT * FROM student_class WHERE student_id = ? AND class_name = ? AND result = ?", [student_id, class_name, result]);
    if (existingClasses.length > 0) {
        // If the class entry already exists, return the existing class entry
        return existingClasses[0];
    } else {
        // If the class entry does not exist, insert a new class entry
        const [createdClass] = await pool.query(`
        INSERT INTO student_class (student_id, class_name, result)
        VALUES (?, ?, ?)
        `, [student_id, class_name, result]);
        return getClass(createdClass.insertId);
    }
}

const students = await getStudents()
console.table(students)

const classes = await getClasses()
console.table(classes)

