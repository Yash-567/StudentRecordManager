import express from 'express';
import { getStudent, getStudents, createStudent, getClasses, getClass, createClass } from './database.js';
import cors from 'cors';
import multer from 'multer'; 
import csvParser from 'csv-parser'; 
import fs from 'fs';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' }); 

// Student Master table
app.get("/students", async (req, res)=>{
    const students = await getStudents()
    res.send(students)
})

app.get("/student/:id", async (req, res)=>{
    const id = req.params.id
    const student = await getStudent(id)
    res.send(student)
})

app.post("/student", async (req, res)=>{
    const { name, email } = req.body
    const student = await createStudent(name, email)
    res.status(201).send(student)
})

// Student Class Table
app.get("/classes", async (req, res)=>{
    const classes = await getClasses()
    res.send(classes)
})

app.get("/class/:id", async (req, res)=>{
    const id = req.params.id
    const obtained_class = await getClass(id)
    res.send(obtained_class)
})

app.post("/class", async (req, res)=>{
    const { student_id, class_name, result } = req.body
    const createdClass = await createClass(student_id, class_name, result)
    res.status(201).send(createdClass)
})

// File upload endpoint
app.post("/upload", upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const filePath = req.file.path;
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', async (data) => {
            // Push each parsed row into the results array
            results.push(data);


            try {
                const { Name, Email, Class, Result } = data;
                const student = await createStudent(Name, Email);

                await createClass(student.id, Class, Result);
            } catch (error) {
                console.error("Error creating student or class:", error);
            }
        })
        .on('end', () => {
            res.status(200).send("File uploaded and parsed successfully.");
        });
});


// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server port
app.listen(process.env.MYSQL_PORT, () => {
    console.log('Server is running on port 8080');
});
