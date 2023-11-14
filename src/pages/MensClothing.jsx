import { useState, useEffect, useRef, createRef } from 'react';
import mensClothing800 from '../assets/mensClothing800.webp'

const MensClothing = ({ data }) => {
    const [mensClothing, setMensClothing] = useState([]);
    const imageRefs = useRef([]);
    const headingRefs = useRef([]);
    const subHeadingRefs = useRef([]);
    const textRefs = useRef([]);

    useEffect(() => {
        if (data && data.length > 0) {
            const mensClothingData = data.filter((item) => item.category === "men's clothing");
            setMensClothing(mensClothingData);

            // Create refs for each image and text element
            imageRefs.current = mensClothingData.map(() => createRef());
            headingRefs.current = mensClothingData.map(() => createRef());
            subHeadingRefs.current = mensClothingData.map(() => createRef());
            textRefs.current = mensClothingData.map(() => createRef());
        }
    }, [data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('slide-in');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '80px 0px 0px 0px',
            }
        );

        // Attach the observer to image elements
        imageRefs.current.forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        // Attach the observer to Heading elements
        headingRefs.current.forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        // Attach the observer to subheading elements
        subHeadingRefs.current.forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        // Attach the observer to text elements
        textRefs.current.forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        // Cleanup the observer when the component is unmounted
        return () => {
            imageRefs.current.forEach((ref) => {
                if (ref.current && ref.current instanceof Element) {
                    observer.unobserve(ref.current);
                }
            });
            textRefs.current.forEach((ref) => {
                if (ref.current && ref.current instanceof Element) {
                    observer.unobserve(ref.current);
                }
            });
            headingRefs.current.forEach((ref) => {
                if (ref.current && ref.current instanceof Element) {
                    observer.unobserve(ref.current);
                }
            });
            subHeadingRefs.current.forEach((ref) => {
                if (ref.current && ref.current instanceof Element) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, [mensClothing]);

    return (
        <section className="mens">

            <div className="mens-grid">
                <div className="mens-feature">
                    <img src={mensClothing800} alt="mens shoes and apparel" />
                    <h2>Simple</h2>
                    <h2>Strong</h2>
                    <h2>Style</h2>
                </div>
            </div>

            {mensClothing &&
                mensClothing.length > 0 &&
                mensClothing.map((product, index) => {
                    const words = product.title.split(' ');
                    const firstWord = words.shift();
                    const secondWord = words.shift();
                    const titleRemainder = words.join(' ');

                    return (
                        <div
                            className={`primary page-layout ${index % 2 === 1 ? 'second-row' : ''}`}
                            key={product.id}

                        >
                            <img
                                ref={imageRefs.current[index]}
                                src={product.image}
                                alt={product.title}
                                className={`'slide ${index % 2 === 1 ? 'off-right' : 'off-left'}`}
                            />
                            <div className="primary-content page-content">
                                <h2 className='set-far-down'
                                    ref={headingRefs.current[index]}>{firstWord} {secondWord}</h2>
                                <h3 className='set-down'
                                    ref={subHeadingRefs.current[index]}>{titleRemainder}</h3>
                                <h4>${product.price}
                                    <span>{`   $${(product.price * 1.1).toFixed(2)}`}</span>
                                </h4>
                                <p className='set-down'
                                    ref={textRefs.current[index]}>{product.description}</p>
                                <div className="btn-container">
                                    <button className='add-cart-btn'>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </section>
    );
}

export default MensClothing;





