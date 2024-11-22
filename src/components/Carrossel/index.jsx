import { useEffect, useState } from 'react';
import './index.scss';

export default function Carrossel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        '/assets/images/bebeQuatroK.png',
        '/assets/images/bebeBranco.png',
        '/assets/images/bebeUrso.png',
        '/assets/images/bebeVerde.png',
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);

        return () => clearInterval(intervalId);
    }, [images.length]);


    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className='comp-carrossel'>
            <div className="slider">
                <div
                    className="slides"
                    style={{
                        width: `${images.length * 100}%`,
                        transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
                        transition: 'transform 0.5s ease-in-out',
                    }}
                >
                    {images.map((image, index) => (
                        <div className="slide" key={index} style={{ width: `${100 / images.length}%` }}>
                            <img src={image} alt={`Imagem ${index + 1}`} />
                        </div>
                    ))}
                </div>

                <button
                    className="nav-button left"
                    onClick={handlePrevClick}
                    aria-label="Imagem anterior"
                >
                    {"<"}
                </button>
                <button
                    className="nav-button right"
                    onClick={handleNextClick}
                    aria-label="Próxima imagem"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}
