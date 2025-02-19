import { useState } from 'react';

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/files/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (res.ok) {
            setUploadStatus(`File uploaded: ${data.filename}`);
        } else {
            setUploadStatus("Upload failed");
        }
    };

    return (
        <div>
            <h3>Upload File</h3>
            <input type="file" onChange={handleFileChange} accept=".pdf,image/*" />
            <button onClick={handleUpload}>Upload</button>
            <p>{uploadStatus}</p>
        </div>
    );
}
