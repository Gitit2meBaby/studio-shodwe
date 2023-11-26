import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useGlobalContext } from "../context"
import PropTypes from 'prop-types';
import { statePropTypes } from '../propTypes'

import Cart from "../pages/Cart";
import loading from '../assets/loading.gif'
import logo from '../assets/logo250.webp';

const Header = ({ state, handleIncrease, handleDecrease, handleRemoveItem, handleClearCart, }) => {
    const [, setBrief] = useState([]);
    const [, setRemainder] = useState([]);
    const { cartPopup, setCartPopup, isMobileMenuOpen, setIsMobileMenuOpen } = useGlobalContext();
    const { data, categories } = state;

    useEffect(() => {
        if (data && data.length > 0) {
            const briefTitles = data.map((item) => {
                const words = item.title.split(' ');
                const brief = words.slice(0, 4).join(' ');
                const remainder = words.slice(4).join(' ');
                return { brief, remainder };
            });

            // Extract brief and remainder into separate arrays
            const briefArray = briefTitles.map((title) => title.brief);
            const remainderArray = briefTitles.map((title) => title.remainder);

            // Set the state with the accumulated arrays
            setBrief(briefArray);
            setRemainder(remainderArray);
        }
    }, [data]);

    // Calculate the total number of items in the cart
    const totalItemsInCart = state.cart.reduce((acc, item) => acc + item.amount, 0);

    // callback function to close cart from inside cart component
    const handleCartClose = () => {
        setCartPopup(false)
    }

    // Check for duplicates to try and resolve duplicate key issues
    const uniqueCategories = [...new Set(categories)];

    const handleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <header>
            <Link to={'/'}><div className="logo-container">
                <img src={logo} alt="studio shodwe logo" />
            </div></Link>
            {data && data.length > 0 ? (
                categories.map((category) => (
                    <div className="nav-item" key={category}>
                        <NavLink to={category}><button>
                            {category}
                        </button></NavLink>
                    </div>
                ))
            ) : (
                <img className="loader" src={loading} alt="loading gif" />
            )}
            <div className="toggle"
                onClick={() => handleMobileMenu()}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg"><path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path></svg>
            </div>
            <nav className={`mobile-menu ${isMobileMenuOpen ? "slide-in" : ""} ${cartPopup ? "cart-mobile" : ""}`}>

                <div className="relative-sidebar-spot">
                    {!cartPopup && (
                        <div className="cart-btn-container"
                            onClick={() => setCartPopup(!cartPopup)}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg>
                            <div className="cart-amount"><p>{totalItemsInCart}</p></div>
                        </div>
                    )}
                    <Cart cartPopup={cartPopup}
                        setCartPopup={setCartPopup}
                        handleCartClose={handleCartClose}
                        data={state.data}
                        cart={state.cart}
                        total={state.total}
                        handleRemoveItem={handleRemoveItem}
                        handleClearCart={handleClearCart}
                        handleDecrease={handleDecrease}
                        handleIncrease={handleIncrease} />

                    {!cartPopup && (
                        <svg onClick={() => handleMobileMenu()} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg"><path d="M354 671h58.9c4.7 0 9.2-2.1 12.3-5.7L512 561.8l86.8 103.5c3 3.6 7.5 5.7 12.3 5.7H670c6.8 0 10.5-7.9 6.1-13.1L553.8 512l122.4-145.9c4.4-5.2.7-13.1-6.1-13.1h-58.9c-4.7 0-9.2 2.1-12.3 5.7L512 462.2l-86.8-103.5c-3-3.6-7.5-5.7-12.3-5.7H354c-6.8 0-10.5 7.9-6.1 13.1L470.2 512 347.9 657.9A7.95 7.95 0 0 0 354 671z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
                    )}
                </div>

                {!cartPopup && (
                    <>
                        <Link onClick={() => handleMobileMenu()} to={'/'}>
                            <div className="mob-nav-item">
                                <button>Home</button>
                            </div>
                        </Link>

                        {data && data.length > 0 ? (
                            uniqueCategories.map((category) => (
                                <div className="mob-nav-item" key={category}>
                                    <NavLink to={category}>
                                        <button onClick={() => handleMobileMenu()}>
                                            {category}
                                        </button>
                                    </NavLink>
                                </div>
                            ))
                        ) : null}

                        <div className="mob-nav-item">
                            <button onClick={() => setCartPopup(!cartPopup)}>Your Cart</button>
                        </div>
                    </>
                )}
            </nav>

        </header>
    );

};

Header.propTypes = {
    state: statePropTypes,
    handleIncrease: PropTypes.func,
    handleDecrease: PropTypes.func,
    handleRemoveItem: PropTypes.func,
    handleClearCart: PropTypes.func,
};

export default Header;
