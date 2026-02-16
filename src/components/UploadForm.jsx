import { useState, useRef } from "react";
import { uploadImage } from "../api";

export default function UploadForm({ onUpload }) {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    const handleUpload = async (file) => {
        if (!file) return;
        setError("");
        setUploading(true);
        try {
            await uploadImage(file);
            if (fileInputRef.current) fileInputRef.current.value = "";
            onUpload();
        } catch (err) {
            console.error(err);
            setError("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e) => {
        handleUpload(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        handleUpload(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => setDragOver(false);

    return (
        <div
            className={`upload-zone ${dragOver ? "drag-over" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className="upload-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
            </div>
            <p className="upload-text">
                {uploading
                    ? "Uploading…"
                    : "Drag & drop an image here, or click to browse"}
            </p>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="upload-input"
                id="file-upload"
            />
            <label
                htmlFor="file-upload"
                className={`upload-btn ${uploading ? "disabled" : ""}`}
            >
                {uploading ? "Uploading…" : "Choose File"}
            </label>
            {error && <p className="upload-error">{error}</p>}
        </div>
    );
}
