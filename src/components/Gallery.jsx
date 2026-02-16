import ImageCard from "./ImageCard";

export default function Gallery({ images, onRefresh }) {
    if (!images.length) {
        return (
            <div className="empty-state">
                <div className="empty-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                </div>
                <h3>No images yet</h3>
                <p>Upload your first image to get started</p>
            </div>
        );
    }

    return (
        <div className="gallery-grid">
            {images.map((img) => (
                <ImageCard key={img._id} image={img} onDelete={onRefresh} />
            ))}
        </div>
    );
}
