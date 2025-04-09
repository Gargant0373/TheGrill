import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Gallery.css';

// Import all images from the 2024 folder
const images = Object.values(
    import.meta.glob('./assets/images/*.{png,jpg,jpeg,svg,webp}', { eager: true })
).map((mod) => (mod as { default: string }).default);

const Gallery: React.FC = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = (imagePath: string) => {
        setSelectedImage(imagePath);
    };

    const handleDownload = async (imagePath: string) => {
        try {
            const response = await fetch(imagePath);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = imagePath.split('/').pop() || 'image';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <div className="gallery">
            <button className="back-button" onClick={() => navigate('/')}>
                Go Back
            </button>
            
            <div className="gallery-section">
                <h2>2024</h2>
                <div className="gallery-grid">
                    {images.map((src, index) => (
                        <motion.div
                            key={src}
                            className="gallery-item"
                            onClick={() => handleImageClick(src)}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={src} alt={`Gallery item ${index + 1}`} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {selectedImage && (
                <div className="modal" onClick={() => setSelectedImage(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage} alt="Selected" />
                        <button 
                            className="download-button"
                            onClick={() => handleDownload(selectedImage)}
                        >
                            Download
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;