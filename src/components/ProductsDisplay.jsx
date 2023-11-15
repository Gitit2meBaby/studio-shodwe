import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from "../context"

const ProductsDisplay = ({ data }) => {
    const {
        scrollTarget, setScrollTarget, setPage,
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

        if (firstSection.current) {
            observer.observe(firstSection.current);
        }

        return () => {
            if (firstSection.current) {
                setIsVisible(false)
                observer.unobserve(firstSection.current);
            }
        };
    }, [firstSection.current, setPage, setSidebarText, setSidebarIcon, setSidebarNumber]);

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
        <section ref={firstSection} className="products-display">
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
                                    <button className='add-cart-btn'>Add to Cart</button>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))
            )}

            <div className="grid-row-thirds">
                {data && data.length > 0 && (
                    data.map((product) => (
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
                                                <button className='add-cart-btn small-btn'>Add</button>
                                                <button className="text-btn">Learn More...</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </React.Fragment>
                    ))
                )}
            </div>
        </section>
    );
};

export default ProductsDisplay;
