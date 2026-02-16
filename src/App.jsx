import { useState, useEffect } from "react";
import { fetchImages } from "./api";
import UploadForm from "./components/UploadForm";
import Gallery from "./components/Gallery";

export default function App() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadImages = async () => {
        try {
            setError("");
            const { data } = await fetchImages();
            setImages(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load images. Make sure the server is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-content">
                    <div className="logo">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                    </div>
                    <div>
                        <h1>Cloud Gallery</h1>
                        <p className="subtitle">Upload &amp; manage your images in the cloud</p>
                    </div>
                </div>
                <div className="image-count">
                    {!loading && <span>{images.length} image{images.length !== 1 ? "s" : ""}</span>}
                </div>
            </header>

            <main className="main-content">
                <UploadForm onUpload={loadImages} />

                {error && (
                    <div className="error-banner">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>Loading gallery…</p>
                    </div>
                ) : (
                    <Gallery images={images} onRefresh={loadImages} />
                )}
            </main>
        </div>
    );
}
