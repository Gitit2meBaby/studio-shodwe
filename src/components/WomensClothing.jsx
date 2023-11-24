import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from "../context"
import { Link } from 'react-router-dom'
import { statePropTypes } from '../propTypes';
import PropTypes from 'prop-types';


const WomensClothing = ({ data, handleAddToCart }) => {
    const {
        setPage, setActivePage,
        setSidebarText, setSidebarIcon, setSidebarNumber, setIsVisible
    } = useGlobalContext();

    const [hoverStates, setHoverStates] = useState({});
    const [firstWord, setFirstWord] = useState('');
    const [titleRemainder, setTitleRemainder] = useState('');
    const [womens, setWomens] = useState([])
    const [showContent, setShowContent] = useState(false)
    const [initalContent, setInitialContent] = useState('')
    const [secondaryContent, setSecondaryContent] = useState('')

    const finalSection = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setPage('home')
                        setSidebarText("Women's Clothing");
                        setSidebarIcon(4);
                        setSidebarNumber('04');
                        setIsVisible(true)
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '150px 0px 0px 0px',
            }
        );
        const finalSectionCurrent = finalSection.current
        if (finalSection.current) {
            observer.observe(finalSection.current);
        }

        return () => {
            if (finalSectionCurrent) {
                setIsVisible(false)
                observer.unobserve(finalSectionCurrent);
            }
        };
    }, [setIsVisible, finalSection, setPage, setSidebarText, setSidebarIcon, setSidebarNumber]);

    // filter out womens clothing from data array
    useEffect(() => {
        if (data && data.length > 0) {
            const womens = data.filter((item) => item.category === "women's clothing");
            setWomens(womens);
        }
    }, [data]);

    // format the Title nicer by seperating the first word (needed useEffect because otherwise error if data is unavailable)
    useEffect(() => {
        if (womens && womens.length > 0) {
            const splitTitle = womens[0].title.split(' ');
            const firstWord = splitTitle.shift();
            const titleRemainder = splitTitle.join(' ');

            setFirstWord(firstWord);
            setTitleRemainder(titleRemainder);
            setActivePage('womens')

            // format description with a break
            if (womens[0].description) {
                const productDescription = womens[0].description;
                const sentences = productDescription.split('. ');

                // Divide the description into two halves
                const firstHalf = sentences.slice(0, Math.ceil(sentences.length / 2)).join('. ');
                setSecondaryContent(firstHalf);
                const secondHalf = sentences.slice(Math.ceil(sentences.length / 2)).join('.\n');
                setInitialContent(secondHalf);
            }

        }
    }, [womens]);

    // reduce length of titles for the hover divs
    function reduceToWords(text, wordCount) {
        const words = text.split(' ');
        const reducedWords = words.slice(0, wordCount);
        const reducedText = reducedWords.join(' ');

        return reducedText;
    }

    const handleMouseOver = (productId) => {
        setHoverStates((prevHoverStates) => ({ ...prevHoverStates, [productId]: true }));
    }
    const handleMouseOut = (productId) => {
        setHoverStates((prevHoverStates) => ({ ...prevHoverStates, [productId]: false }));
    }

    return (
        <section id='home3' ref={finalSection} className="womens-clothing">

            {womens && womens.length > 0 && (
                womens.map((product, index) => (

                    index === 0 && (
                        <div className='primary' key={product.id}>
                            <img src={product.image} alt={product.title} />
                            <div className='primary-content'>
                                <h2>{firstWord}</h2>
                                <h3>{titleRemainder}</h3>
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
                    )
                ))
            )}

            <div className="grid-row-thirds">
                {womens && womens.length > 0 && (
                    womens.map((product, index) => (
                        <React.Fragment key={product.id}>
                            {index >= 2 && index <= 4 && (
                                <div className='product-img-secondary'
                                    onMouseOver={() => handleMouseOver(product.id)}
                                    onMouseOut={() => handleMouseOut(product.id)}
                                >
                                    <img src={product.image} alt={product.title} />
                                    {hoverStates[product.id] && (
                                        <div className='hover-div'>
                                            <h2>{reduceToWords(product.title, 4)}</h2>
                                            <p>${product.price}</p>
                                            <div className="btn-container">
                                                <button onClick={() => handleAddToCart(product)} className='add-cart-btn small-btn'>Add</button>
                                                <Link to={"/women's clothing"}><button className="text-btn">Learn More...</button></Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </React.Fragment>
                    ))
                )}
            </div>
            <p>*Tap for more info...</p>

            <Link to={'/jewelery'}><div className='jewellry-link womens-link'>
                <div><h2>See collection</h2></div>
                <div className='arrow-div'><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg></div>
            </div></Link>
        </section>
    );
}

WomensClothing.propTypes = {
    state: statePropTypes,
    handleAddToCart: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object),
};

export default WomensClothing;
