import { useState, useEffect, useRef, createRef, useCallback, useMemo } from 'react';
import { useGlobalContext } from "../context"

import gadgets from '../assets/gadgets800.webp';
import person from '../assets/person-with-phone400.webp';

const Electronics = ({ data }) => {
    const {
        scrollTarget, setScrollTarget, setPage,
        setSidebarText, setSidebarIcon, setSidebarNumber, setIsVisible,
        setSidebarIconAmount,
    } = useGlobalContext();

    const [electronics, setElectronics] = useState([]);

    const electronicsHome = useRef()
    const imageRefs = useRef([]);
    const headingRefs = useRef([]);
    const subHeadingRefs = useRef([]);
    const textRefs = useRef([]);

    // Get incoming Data and filter for electronics category
    useEffect(() => {
        if (data && data.length > 0) {
            const electronicsData = data.filter((item) => item.category === 'electronics');
            setElectronics(electronicsData);

            // Create refs for each image and text element
            imageRefs.current = electronicsData.map(() => createRef());
            headingRefs.current = electronicsData.map(() => createRef());
            subHeadingRefs.current = electronicsData.map(() => createRef());
            textRefs.current = electronicsData.map(() => createRef());

        }
    }, [data]);

    // Seperate the home observer, useMemo needed so i can use homeObserver in dependecy array to set values on load
    const homeObserver = useMemo(() => (
        new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setPage('electronics');
                        setSidebarText("scroll down");
                        setSidebarIcon(1);
                        setSidebarNumber('01');
                        setIsVisible(true);
                        setSidebarIconAmount(electronics.length + 1);
                    }
                });
            },
            {
                threshold: 0.01,
                rootMargin: '-100px 0px 100px 0px',
            }
        )
    ), [electronics.length]);

    useEffect(() => {
        const homeRef = electronicsHome.current;
        if (homeRef) {
            homeObserver.observe(homeRef);

            return () => {
                homeObserver.unobserve(homeRef);
            };
        }
    }, [homeObserver]);

    //interaction observers to handle scrollTo and sidebar
    const setupIntersectionObserver = useCallback(
        (product, index, firstWord) => {

            return new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setSidebarText(firstWord);
                            setSidebarIcon((index + 1) + 1);
                            setSidebarNumber(`0${(index + 1) + 1}`);
                            setIsVisible(true);
                            setSidebarIconAmount(electronics.length + 1);
                        }
                    });
                },
                {
                    threshold: 0.01,
                    rootMargin: '50px 0px -50px 0px',
                }
            );
        },
        [setSidebarText, setSidebarIcon, setSidebarNumber, setIsVisible, setSidebarIconAmount, electronics.length]
    );

    useEffect(() => {
        // Set up Intersection Observers for each product
        const productObservers = electronics.map((product, index) => {
            const words = product.title.split(' ');
            const firstWord = words.shift();
            const titleRemainder = words.join(' ');

            const observer = setupIntersectionObserver(product, index, firstWord);

            return observer;
        });

        // Attach the observer to each product
        electronics.forEach((product, index) => {
            if (textRefs.current[index] && textRefs.current[index].current) {
                productObservers[index].observe(textRefs.current[index].current);
            }
        });

        // Clean up the observers
        return () => {
            productObservers.forEach((observer) => observer.disconnect());
            setIsVisible(false);
        };
    }, [
        electronics,
        imageRefs,
        setPage,
        setSidebarText,
        setSidebarIcon,
        setSidebarNumber,
        setSidebarIconAmount,
        setIsVisible,
        setupIntersectionObserver,
    ]);

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
                rootMargin: '50px 0px 0px 0px',
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
    }, [electronics]);

    return (
        <section className="electronics">
            <div className="electronics-grid">
                <div className="title electronics-title">
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
                    <div ref={electronicsHome} className="arrows">
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
                                ref={imageRefs.current[index]}
                                src={product.image}
                                alt={product.title}
                                className={`'slide ${index % 2 === 1 ? 'off-right' : 'off-left'}`}
                            />
                            <div className="primary-content page-content">
                                <h2 className='set-far-down'
                                    ref={headingRefs.current[index]}>{firstWord}</h2>
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

export default Electronics;