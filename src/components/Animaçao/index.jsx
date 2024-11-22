import './index.scss';
import { useEffect, useRef, useState } from 'react';

export default function AnimatedSection({ children }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (ref.current) {
            const { top, bottom } = ref.current.getBoundingClientRect();
            const isInViewport = bottom >= 0 && top <= window.innerHeight;

            if (isInViewport && !isVisible) {
                setIsVisible(true);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isVisible]);

    return (
        <div
            ref={ref}
            className={`animated-section ${isVisible ? 'fadeIn' : ''}`}
        >
            {children}
        </div>
    );
}
