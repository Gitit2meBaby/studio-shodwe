import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from "../context"
import gadgets from '../assets/gadgets800.webp'

const WomensClothing = ({ data, handleAddToCart }) => {
    const {
        scrollTarget, setScrollTarget, setPage,
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

        if (finalSection.current) {
            observer.observe(finalSection.current);
        }

        return () => {
            if (finalSection.current) {
                setIsVisible(false)
                observer.unobserve(finalSection.current);
            }
        };
    }, [finalSection, setPage, setSidebarText, setSidebarIcon, setSidebarNumber]);

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


    const handleMouseOver = (productId) => {
        setHoverStates((prevHoverStates) => ({ ...prevHoverStates, [productId]: true }));
    }
    const handleMouseOut = (productId) => {
        setHoverStates((prevHoverStates) => ({ ...prevHoverStates, [productId]: false }));
    }

    return (
        <section ref={finalSection} className="womens-clothing">

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
                                            <h2>{product.title}</h2>
                                            <p>${product.price}</p>
                                            <div className="btn-container">
                                                <button onClick={() => handleAddToCart(product)} className='add-cart-btn small-btn'>Add</button>
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

}
export default WomensClothing;
