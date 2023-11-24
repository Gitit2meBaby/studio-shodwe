import { useState, useEffect, useRef, createRef, useCallback, useMemo } from 'react';
import { useGlobalContext } from "../context"
import { motion } from 'framer-motion'
import { statePropTypes } from '../propTypes';
import PropTypes from 'prop-types';

import { slideInLeft, slideInDown, slideInRight, textFadeInDelay2, textFadeInDelay3, textFadeInDelay4, textFadeInDelay5, slideInDown2, slideInDown3, slideInDown4 } from '../animations'

import gadgets from '../assets/gadgets800.webp';
import person from '../assets/person-with-phone400.webp';

const Electronics = ({ data, handleAddToCart }) => {
    const {
        setPage, handleScrollTo,
        setSidebarText, setSidebarIcon, setSidebarNumber, setIsVisible,
        setSidebarIconAmount, setActivePage
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
            setActivePage('electronics')

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
    ), [electronics.length, setIsVisible, setPage, setSidebarIcon, setSidebarIconAmount, setSidebarNumber, setSidebarText]);

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
            <div id='electronics0' className="electronics-grid">
                <motion.div {...slideInDown} className="title electronics-title">
                    <h1>Electronics</h1>
                </motion.div>

                <div className='electronic-feature'>
                    <motion.img {...slideInRight} src={gadgets} alt="technology gadgets on a table" />
                    <motion.p {...textFadeInDelay2}>Learn</motion.p>
                    <motion.p {...textFadeInDelay3}>Play</motion.p>
                    <motion.p {...textFadeInDelay4}>Discover</motion.p>
                    <motion.button {...textFadeInDelay5}
                        onClick={() => handleScrollTo('electronics', 1)}
                        className='text-btn'>Show Tech</motion.button>
                </div>

                <div className="inner-grid">
                    <motion.div {...slideInLeft} className="person-img">
                        <img src={person} alt="person with phone" />
                    </motion.div>
                    <div ref={electronicsHome} className="arrows">
                        <motion.div {...slideInDown2} className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></motion.div>
                        <motion.div {...slideInDown3} className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></motion.div>
                        <motion.div {...slideInDown4} className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></motion.div>
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
                        <div id={`electronics${index + 1}`}
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
                                    <button onClick={() => handleAddToCart(product)} className='add-cart-btn'>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </section>
    );
}
Electronics.propTypes = {
    state: statePropTypes,
    handleAddToCart: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object),
};
export default Electronics;