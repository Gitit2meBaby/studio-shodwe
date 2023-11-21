import React, { useState, useEffect, useRef, createRef, useCallback, useMemo } from 'react';
import { useGlobalContext } from "../context"

import womens400 from '../assets/womens400.webp'
import womensPortrait from '../assets/womensportrait.webp'

const Womens = ({ data, handleAddToCart }) => {
    const {
        scrollTarget, setScrollTarget, setPage,
        setSidebarText, setSidebarIcon, setSidebarNumber, setIsVisible,
        setSidebarIconAmount,
    } = useGlobalContext();

    const [womensClothing, setWomensClothing] = useState([]);
    const [firstWord, setFirstWord] = useState('');
    const [titleRemainder, setTitleRemainder] = useState('');
    const [showContent, setShowContent] = useState(false)
    const [initalContent, setInitialContent] = useState('')
    const [secondaryContent, setSecondaryContent] = useState('')

    const womensHome = useRef()
    const imageRefs = useRef([]);
    const headingRefs = useRef([]);
    const subHeadingRefs = useRef([]);
    const textRefs = useRef([]);

    // filter for womens category from API data
    useEffect(() => {
        if (data && data.length > 0) {
            const womensClothingData = data.filter((item) => item.category === "women's clothing");
            setWomensClothing(womensClothingData);

            // Create refs for each image and text element
            imageRefs.current = womensClothingData.map(() => createRef());
            headingRefs.current = womensClothingData.map(() => createRef());
            subHeadingRefs.current = womensClothingData.map(() => createRef());
            textRefs.current = womensClothingData.map(() => createRef());
        }
    }, [data]);

    // Seperate the home observer, useMemo needed so i can use homeObserver in dependecy array to set values on load
    const homeObserver = useMemo(() => (
        new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setPage("women's clothing");
                        setSidebarText("scroll down");
                        setSidebarIcon(1);
                        setSidebarNumber('01');
                        setIsVisible(true);
                        setSidebarIconAmount(womensClothing.length + 1);
                    }
                });
            },
            {
                threshold: 0.01,
                rootMargin: '-100px 0px 100px 0px',
            }
        )
    ), [womensClothing.length]);

    useEffect(() => {
        const homeRef = womensHome.current;
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
                            setSidebarText(`${firstWord}`);
                            setSidebarIcon((index + 1) + 1);
                            setSidebarNumber(`0${(index + 1) + 1}`);
                            setIsVisible(true);
                            setSidebarIconAmount(womensClothing.length + 1);
                        }
                    });
                },
                {
                    threshold: 0.01,
                    rootMargin: '50px 0px -50px 0px',
                }
            );
        },
        [setSidebarText, setSidebarIcon, setSidebarNumber, setIsVisible, setSidebarIconAmount, womensClothing.length]
    );

    useEffect(() => {
        // Set up Intersection Observers for each product
        const productObservers = womensClothing.map((product, index) => {
            const words = product.title.split(' ');
            const firstWord = words.shift();
            const secondWord = words.shift();

            const observer = setupIntersectionObserver(product, index, firstWord, secondWord);

            return observer;
        });

        // Attach the observer to each product
        womensClothing.forEach((product, index) => {
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
        womensClothing,
        imageRefs,
        setSidebarText,
        setSidebarIcon,
        setSidebarNumber,
        setSidebarIconAmount,
        setIsVisible,
        setupIntersectionObserver,
    ]);

    // observers for slide in animations
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
    }, [womensClothing]);

    // break up the long description in half for better UI
    useEffect(() => {
        if (womensClothing && womensClothing.length > 0) {
            const splitTitle = womensClothing[0].title.split(' ');
            const firstWord = splitTitle.shift();
            const titleRemainder = splitTitle.join(' ');

            setFirstWord(firstWord);
            setTitleRemainder(titleRemainder);

            // format description with a break
            if (womensClothing[0].description) {
                const productDescription = womensClothing[0].description;
                const sentences = productDescription.split('. ');

                // Divide the description into two halves
                const firstHalf = sentences.slice(0, Math.ceil(sentences.length / 2)).join('. ');
                setSecondaryContent(firstHalf);
                const secondHalf = sentences.slice(Math.ceil(sentences.length / 2)).join('.\n');
                setInitialContent(secondHalf);
            }
        }
    }, [womensClothing]);


    return (
        <section className="womens">

            <div className="womens-grid">
                <div className="womens-secondary">
                    <img src={womensPortrait} alt="fashionable lady" />
                </div>

                <div className="title womens-title">
                    <h1>Women's Clothing</h1>
                </div>
                <div className="womens-small">
                    <img src={womens400} alt="woman posing" />
                </div>
                <div ref={womensHome} className="arrows">
                    <div className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></div>
                    <div className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></div>
                    <div className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></div>
                    <div className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></div>
                </div>



            </div>

            {womensClothing &&
                womensClothing.length > 0 &&
                womensClothing.map((product, index) => {
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
                                <p>{initalContent.split('\n').map((sentence, index) => (
                                    <React.Fragment key={index}>
                                        {sentence}
                                        <br />
                                        <br />
                                    </React.Fragment>
                                ))}</p>
                                <button className="text-btn"
                                    onClick={() => setShowContent(!showContent)}
                                >Learn More...</button>
                                {showContent &&
                                    <p style={{ marginBottom: '2rem' }}>{secondaryContent}</p>
                                }
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

export default Womens;





