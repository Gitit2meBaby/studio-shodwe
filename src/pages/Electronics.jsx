import React, { useState, useEffect, useRef, createRef } from 'react';
import gadgets from '../assets/gadgets800.webp'
import person from '../assets/person-with-phone400.webp'

const Electronics = ({ data }) => {
    const [electronics, setElectronics] = useState([]);
    const refs = useRef([]);

    useEffect(() => {
        if (data && data.length > 0) {
            const electronicsData = data.filter((item) => item.category === 'electronics');
            setElectronics(electronicsData);

            // Create refs for each element in electronics
            refs.current = electronicsData.map(() => createRef());
        }
    }, [data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log('Element is in view:', entry.target);
                        entry.target.classList.add('slide-in');
                    } else {
                        console.log('Element is out of view:', entry.target);
                        // entry.target.classList.remove('slide-in');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px 0px 0px 0px',
            }
        );


        refs.current.forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            // Cleanup by unobserving all elements when the component is unmounted
            refs.current.forEach((ref) => {
                if (ref.current && ref.current instanceof Element) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, [electronics]);

    return (
        <section className="electronics">
            <div className="electronics-grid">
                <div className="title">
                    <h1>Electronics</h1>
                </div>

                <div className='electronic-feature'>
                    <img src={gadgets} alt="technology gadgets on a table" />
                    <p>Learn..</p><p>Play...</p> <p>Discover.</p>
                    <button className='text-btn'>Show Tech</button>
                </div>

                <div className="inner-grid">
                    <div className="person-img">
                        <img src={person} alt="person with phone" />
                    </div>
                    <div className="arrows">
                        <div className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></div>
                        <div className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></div>
                        <div className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></div>
                    </div>
                </div>
            </div>

            {electronics &&
                electronics.length > 0 &&
                electronics.map((product, index) => {
                    const words = product.title.split(' ');
                    const firstWord = words.shift();
                    const titleRemainder = words.join(' ');

                    return (
                        <div
                            className={`primary page-layout ${index % 2 === 1 ? 'second-row' : ''}`}
                            key={product.id}

                        >
                            <img
                                ref={refs.current[index]}
                                src={product.image}
                                alt={product.title}
                                className={`'slide ${index % 2 === 1 ? 'off-right' : 'off-left'}`}
                            />
                            <div className="primary-content page-content">
                                <h2>{firstWord}</h2>
                                <h3>{titleRemainder}</h3>
                                <h4>${product.price}
                                    <span>{`   $${(product.price * 1.1).toFixed(2)}`}</span>
                                </h4>
                                <p>{product.description}</p>
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

export default Electronics;





