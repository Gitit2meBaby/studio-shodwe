import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { useGlobalContext } from "../context"
import { statePropTypes } from '../propTypes';
import PropTypes from 'prop-types';


const ProductsDisplay = ({ data, handleAddToCart }) => {
    const {
        setPage, handleScrollTo,
        setSidebarText, setSidebarIcon, setSidebarNumber, setIsVisible,
    } = useGlobalContext();

    const [hoverStates, setHoverStates] = useState({});
    const [firstWord, setFirstWord] = useState('');
    const [titleRemainder, setTitleRemainder] = useState('');

    const firstSection = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setPage('home')
                        setSidebarText("Men's Clothing");
                        setSidebarIcon(2);
                        setSidebarNumber('02');
                        setIsVisible(true)
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '150px 0px 0px 0px',
            }
        );

        const firstSectionCurrent = firstSection.current

        if (firstSection.current) {
            observer.observe(firstSection.current);
        }

        return () => {
            if (firstSectionCurrent) {
                setIsVisible(false)
                observer.unobserve(firstSectionCurrent);
            }
        };
    }, [setIsVisible, setPage, setSidebarText, setSidebarIcon, setSidebarNumber]);

    // format the Title nicer by separating the first word (needed useEffect because otherwise error if data is unavailable)
    useEffect(() => {
        if (data && data.length > 0) {
            const splitTitle = data[0].title.split(' ');
            const firstWord = splitTitle.shift();
            const titleRemainder = splitTitle.join(' ');

            setFirstWord(firstWord);
            setTitleRemainder(titleRemainder);
        }
    }, [data]);


    const handleMouseOver = (productId) => {
        setHoverStates((prevHoverStates) => ({ ...prevHoverStates, [productId]: true }));
    };

    const handleMouseOut = (productId) => {
        setHoverStates((prevHoverStates) => ({ ...prevHoverStates, [productId]: false }));
    };

    return (
        <section id='home1' ref={firstSection} className="products-display">
            {data && data.length > 0 && (
                data.map((product) => (
                    <React.Fragment key={product.id}>
                        {product.id === 1 && (
                            <div className='split-row'>
                                <div className='product-img-main'>
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className="product-main-content">
                                    <h2>{firstWord}</h2>
                                    <h3>{titleRemainder}</h3>
                                    <p>{product.description}</p>
                                    <h4>${product.price}
                                        <span>{`   $${(product.price * 1.1).toFixed(2)}`}</span>
                                    </h4>
                                    <button onClick={() => handleAddToCart(product)} className='add-cart-btn'>Add to Cart</button>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))
            )}

            <div className="grid-row-thirds">
                {data && data.length > 0 && (
                    data.map((product, index) => (
                        <React.Fragment key={product.id}>
                            {product.id >= 2 && product.id <= 4 && (
                                <div
                                    className='product-img-secondary'
                                    onMouseOver={() => handleMouseOver(product.id)}
                                    onMouseOut={() => handleMouseOut(product.id)}
                                >
                                    <img src={product.image} alt={product.title} />
                                    {hoverStates[product.id] && (
                                        <div className='hover-div'>
                                            <h2>{product.title}</h2>
                                            <p>${product.price}</p>
                                            <div className="btn-container">
                                                <button onClick={() => handleAddToCart(product)} className='add-cart-btn small-btn'>Add</button>
                                                <Link to={"/men's clothing"}><button
                                                    onClick={() => handleScrollTo('mens', { index })}
                                                    className="text-btn">Learn More...</button></Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </React.Fragment>
                    ))
                )}
            </div>
            <p className='tap-info'>*Tap for more info...</p>
        </section>
    );
};

ProductsDisplay.propTypes = {
    state: statePropTypes,
    handleAddToCart: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object),
};

export default ProductsDisplay;
