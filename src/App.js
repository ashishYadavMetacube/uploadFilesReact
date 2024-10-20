import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Optional: Custom CSS

function App() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchFiles = async () => {
        const response = await axios.get('http://testapp-2101952692:8000/files/');
        setFiles(response.data);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        await axios.post('http://testapp-2101952692:8000/upload/', formData);
        fetchFiles();
        setSelectedFile(null);
    };

    const handleFileDelete = async (fileId) => {
        await axios.delete(`http://testapp-2101952692:8000/files/${fileId}`);
        fetchFiles();
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const getFileUrl = (filename) => {
        return `http://testapp-2101952692:8000/files/${filename}`;
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">File Upload</h1>
            <form onSubmit={handleFileUpload} className="mb-4">
                <div className="input-group">
                    <input type="file" className="form-control" onChange={handleFileChange} />
                    <button type="submit" className="btn btn-primary">Upload</button>
                </div>
            </form>
            <h2 className="text-center">Uploaded Files</h2>
            <div className="row">
                {files.map((file) => (
                    <div key={file.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{file.filename}</h5>
                                {file.filename.endsWith('.jpg') || file.filename.endsWith('.png') || file.filename.endsWith('.gif') ? (
                                    <img src={getFileUrl(file.filename)} alt={file.filename} className="img-fluid" />
                                ) : (
                                    <a href={getFileUrl(file.filename)} target="_blank" rel="noopener noreferrer">
                                        Download {file.filename}
                                    </a>
                                )}
                                <p className="card-text">ID: {file.id}</p>
                                <button onClick={() => handleFileDelete(file.id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
