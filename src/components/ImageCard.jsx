import { useState } from "react";
import { deleteImage } from "../api";

export default function ImageCard({ image, onDelete }) {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteImage(image._id);
            onDelete();
        } catch (err) {
            console.error(err);
            setDeleting(false);
        }
    };

    return (
        <div className="image-card">
            <div className="image-wrapper">
                <img src={image.imageUrl} alt="Gallery" loading="lazy" />
                <div className="image-overlay">
                    <button
                        className="delete-btn"
                        onClick={handleDelete}
                        disabled={deleting}
                        title="Delete image"
                    >
                        {deleting ? (
                            <span className="spinner-small" />
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            <div className="image-meta">
                <span className="image-date">
                    {new Date(image.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </span>
            </div>
        </div>
    );
}
