import React, { useState } from 'react';
import Navigation from './Navigation';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { Typography } from '@mui/material';

let SERVER_URL = "https://studentrecordmanager.onrender.com";

export default function UploadFiles() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [error, setError] = useState('');

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleFileUpload = () => {
        if (!selectedFile) {
            setError('Please select a file.');
            return;
        }
        // Check if the selected file is a CSV file
        if (!selectedFile.name.endsWith('.csv')) {
            setError('Please select a CSV file.');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post(SERVER_URL + '/upload', formData)
            .then(response => {
                console.log(response);
                setSelectedFile(null);
                setUploadMessage('File uploaded successfully.');
                setError('');
            })
            .catch(error => {
                console.error(error);
                setUploadMessage('');
                setError('Error uploading file.');
            });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setUploadMessage('');
        setError('');
    };

    return (
        <>
            <Navigation />
            <div style={{ textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom style={{ padding: "15px" }}>
                    Upload File
                </Typography>
                <form>
                    <div>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            onClick={handleFileUpload}
                        >
                            Choose File
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Button>
                        {selectedFile && <Typography variant="body1">{selectedFile.name}</Typography>}
                        {error && <Typography variant="body1" style={{ color: 'red' }}>{error}</Typography>}
                    </div>
                    <Button onClick={handleFileUpload}>Submit</Button>
                    {uploadMessage && <Typography variant="body1" style={{ marginTop: '10px', color: 'green' }}>{uploadMessage}</Typography>}
                </form>
            </div>
        </>
    );
}
