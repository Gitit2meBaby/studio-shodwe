import React, { useEffect, useRef } from 'react';

const TestComponent = () => {
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.style.backgroundColor = 'red';
                } else {
                    entry.target.style.backgroundColor = 'white';
                }
            },
            {
                threshold: 0.1
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div>
            <div style={{ height: '100vh' }}></div>
            <div ref={ref} style={{ height: '100vh' }}>
                Scroll to me!
            </div>
        </div>
    );
};

export default TestComponent;
