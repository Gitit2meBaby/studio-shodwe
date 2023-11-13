import React, { useState, useEffect } from 'react';
import gadgets from '../assets/gadgets800.webp'

const Electronics = ({ data }) => {
    const [hoverStates, setHoverStates] = useState({});
    const [firstWord, setFirstWord] = useState('');
    const [titleRemainder, setTitleRemainder] = useState('');
    const [electronics, setElectonics] = useState([])


    // filter out electronics from data array
    useEffect(() => {
        if (data && data.length > 0) {
            const electronics = data.filter((item) => item.category === "electronics");
            setElectonics(electronics);
        }
    }, [data]);

    // format the Title nicer by seperating the first word (needed useEffect because otherwise error if data is unavailable)
    useEffect(() => {
        if (electronics && electronics.length > 0) {
            const splitTitle = electronics[0].title.split(' ');
            const firstWord = splitTitle.shift();
            const titleRemainder = splitTitle.join(' ');

            setFirstWord(firstWord);
            setTitleRemainder(titleRemainder);
        }
    }, [electronics]);

    const handleMouseOver = (productId) => {
        setHoverStates((prevHoverStates) => ({ ...prevHoverStates, [productId]: true }));
    }
    const handleMouseOut = (productId) => {
        setHoverStates((prevHoverStates) => ({ ...prevHoverStates, [productId]: false }));
    }

    return (
        <section className="electronics-grid">

            {electronics && electronics.length > 0 && (
                electronics.map((product, index) => (
                    <React.Fragment key={product.id}>
                        {index === 0 && (
                            <div className='electronics-secondary'>
                                <img src={product.image} alt={product.title} />
                                <div className='electronics-secondary-content'>
                                    <h2>{product.title}</h2>
                                    <p>${product.price}</p>
                                    <div className="btn-container">
                                        <button className='add-cart-btn small-btn'>Add</button>
                                        <button className="text-btn">Learn More...</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))
            )}

            <div className='electronic-feature'>
                <img src={gadgets} alt="technology gadgets on a table" />
                <p>Learn..</p><p>Play...</p> <p>Discover.</p>
                <button className='text-btn'>Search Tech</button>
            </div>


            {electronics && electronics.length > 0 && (
                electronics.map((product, index) => (
                    <React.Fragment key={product.id}>
                        {index >= 2 && index <= 8 && (
                            <div className='electronics-small'
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
        </section>
    );

}
export default Electronics;
