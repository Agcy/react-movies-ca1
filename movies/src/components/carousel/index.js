import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Carousel = ({ images, interval = 3000 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto' }}>
            {images.map((image, index) => (
                <Paper
                    key={index}
                    style={{
                        display: index === currentImageIndex ? 'block' : 'none',
                        width: '100%',
                        height: '300px',
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            ))}
        </Box>
    );
};

export default Carousel;
