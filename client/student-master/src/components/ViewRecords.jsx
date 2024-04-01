import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

export default function ViewRecords() {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    // Fetch students data from backend
    useEffect(() => {
        axios.get('http://localhost:8080/students')
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching students data:', error);
            });
    }, []);

    // Fetch classes data from backend
    useEffect(() => {
        axios.get('http://localhost:8080/classes')
            .then(response => {
                setClasses(response.data);
            })
            .catch(error => {
                console.error('Error fetching classes data:', error);
            });
    }, []);

    return (
        <>
            <Navigation />
            <Box display="flex" flexDirection="column" alignItems="center" p={3}>
                <Typography variant="h3" gutterBottom>
                    Records
                </Typography>
                <Box display="flex" justifyContent="space-around" width="100%">
                    <div style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
                        <Typography variant="h4" gutterBottom style={{ padding: '10px' }}>
                            Students
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students.map(student => (
                                        <TableRow key={student.id}>
                                            <TableCell>{student.id}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.email}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
                        <Typography variant="h4" gutterBottom style={{ padding: '10px' }}>
                            Classes
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Student ID</TableCell>
                                        <TableCell>Class Name</TableCell>
                                        <TableCell>Result</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {classes.map(cls => (
                                        <TableRow key={cls.id}>
                                            <TableCell>{cls.id}</TableCell>
                                            <TableCell>{cls.student_id}</TableCell>
                                            <TableCell>{cls.class_name}</TableCell>
                                            <TableCell>{cls.result}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Box>
            </Box>
        </>
    );
}
