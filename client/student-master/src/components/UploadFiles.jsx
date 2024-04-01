import React, { useState } from 'react';
import Navigation from './Navigation';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { Typography } from '@mui/material';

export default function UploadFiles() {
    const [selectedFile, setSelectedFile] = useState(null);

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
        if (!selectedFile) return; // Check if a file is selected
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('http://localhost:8080/upload', formData)
            .then(response => {
                console.log(response);
                setSelectedFile(null);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
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
                    </div>
                    <Button onClick={handleFileUpload}>Submit</Button>
                </form>
            </div>
        </>
    );
}
