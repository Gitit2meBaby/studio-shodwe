import { useState, useEffect, useRef, createRef, useCallback, useMemo } from 'react';
import { useGlobalContext } from "../context"
import { statePropTypes } from '../propTypes';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion'
import { slideInLeft, slideInUp, slideInRight, textFadeInDelay3, textFadeInDelay4, textFadeInDelay5, slideInDown1, slideInDown2, slideInDown3, slideInDown4 } from '../animations'

import jewelery800 from '../assets/jewelery800.webp'
import jewelery400 from '../assets/jewelery400.webp'

const Jewelery = ({ data, handleAddToCart, cart, addedToCart }) => {
    const {
        setPage,
        setSidebarText, setSidebarIcon, setSidebarNumber, setIsVisible,
        setSidebarIconAmount, activePage, setPageTextRefs, setActivePage
    } = useGlobalContext();

    const [jewelery, setJewelery] = useState([]);

    const jeweleryHome = useRef()
    const imageRefs = useRef([]);
    const headingRefs = useRef([]);
    const subHeadingRefs = useRef([]);
    const textRefs = useRef([]);

    // filter out jewelery list from Data
    useEffect(() => {
        if (data && data.length > 0) {
            const jeweleryData = data.filter((item) => item.category === 'jewelery');
            setJewelery(jeweleryData);

            // Create refs for each image and text element
            imageRefs.current = jeweleryData.map(() => createRef());
            headingRefs.current = jeweleryData.map(() => createRef());
            subHeadingRefs.current = jeweleryData.map(() => createRef());
            textRefs.current = jeweleryData.map(() => createRef());
        }
        setPageTextRefs((prevPageTextRefs) => ({
            ...prevPageTextRefs,
            [activePage]: textRefs.current,
        }));
    }, [data, activePage, textRefs, setPageTextRefs]);

    // Seperate the home observer, useMemo needed so i can use homeObserver in dependecy array to set values on load
    const homeObserver = useMemo(() => (
        new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setPage('jewelery');
                        setActivePage('jewelery');
                        setSidebarText("scroll down");
                        setSidebarIcon(1);
                        setSidebarNumber('01');
                        setIsVisible(true);
                        setSidebarIconAmount(jewelery.length + 1);
                    }
                });
            },
            {
                threshold: 0.01,
                rootMargin: '-100px 0px 100px 0px',
            }
        )
    ), [jewelery.length, setActivePage, setIsVisible, setPage, setSidebarIcon, setSidebarIconAmount, setSidebarNumber, setSidebarText]);

    useEffect(() => {
        const homeRef = jeweleryHome.current;
        if (homeRef) {
            homeObserver.observe(homeRef);

            return () => {
                homeObserver.unobserve(homeRef);
            };
        }
    }, [homeObserver]);

    //interaction observers to handle scrollTo and sidebar
    const setupIntersectionObserver = useCallback(
        (product, index, firstWord, secondWord) => {

            return new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setSidebarText(`${firstWord} ${secondWord}`);
                            setSidebarIcon((index + 1) + 1);
                            setSidebarNumber(`0${(index + 1) + 1}`);
                            setIsVisible(true);
                            setSidebarIconAmount(jewelery.length + 1);
                        }
                    });
                },
                {
                    threshold: 0.01,
                    rootMargin: '50px 0px -50px 0px',
                }
            );
        },
        [setSidebarText, setSidebarIcon, setSidebarNumber, setIsVisible, setSidebarIconAmount, jewelery.length]
    );

    useEffect(() => {
        // Set up Intersection Observers for each product
        const productObservers = jewelery.map((product, index) => {
            const words = product.title.split(' ');
            const firstWord = words.shift();
            const secondWord = words.shift();

            const observer = setupIntersectionObserver(product, index, firstWord, secondWord);

            return observer;
        });

        // Attach the observer to each product
        jewelery.forEach((product, index) => {
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
        jewelery,
        imageRefs,
        setSidebarText,
        setSidebarIcon,
        setSidebarNumber,
        setSidebarIconAmount,
        setIsVisible,
        setupIntersectionObserver,
    ]);

    // observers for movement animations
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
    }, [jewelery]);

    return (
        <section className="jewelery">
            <div id='jewelery0' className="jewelery-grid">

                <motion.div className="jewelery-feature"
                    {...slideInLeft}>
                    <img src={jewelery800} alt="jewelery on a womens body" />
                    <motion.h2 {...textFadeInDelay3}>Look</motion.h2>
                    <motion.h2 {...textFadeInDelay4}>Feel</motion.h2>
                    <motion.h2 {...textFadeInDelay5}>Desire</motion.h2>
                </motion.div>

                <motion.div {...slideInRight} className="title jewelery-title">
                    <h1>Jewelery</h1>
                </motion.div>

                <div className="arrows flex-arrows">
                    <motion.div {...slideInDown1} className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></motion.div>
                    <motion.div {...slideInDown2} ref={jeweleryHome} className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></motion.div>
                    <motion.div {...slideInDown3} className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></motion.div>
                    <motion.div {...slideInDown4} className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></motion.div>
                </div>

                <motion.div {...slideInUp} className='jewelery-secondary'>
                    <img src={jewelery400} alt="earrings on a lady" />
                </motion.div>

            </div>


            {jewelery &&
                jewelery.length > 0 &&
                jewelery.map((product, index) => {
                    const words = product.title.split(' ');
                    const firstWord = words.shift();
                    const secondWord = words.shift();
                    const titleRemainder = words.join(' ');

                    return (
                        <div id={`jewelery${index + 1}`}
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
                                    <div className="relative-btn-container">
                                        <button onClick={() => handleAddToCart(product)} className='add-cart-btn'>
                                            {!addedToCart[product.id] ? 'Add to Cart' : 'In Cart'}
                                        </button>
                                        {cart.map((cartItem) => {
                                            if (cartItem.id === product.id) {
                                                return (
                                                    <div className='item-count' key={cartItem.id}>
                                                        <p>{cartItem.amount}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </section>
    );
}

Jewelery.propTypes = {
    state: statePropTypes,
    handleAddToCart: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object),
};


export default Jewelery;