import { useGlobalContext } from "../context"
import { statePropTypes } from '../propTypes';
import PropTypes from 'prop-types';

import Cart from "../pages/Cart";

const Sidebar = ({ state, handleIncrease, handleDecrease, handleRemoveItem, handleClearCart }) => {
    const { sidebarText, handleScrollTo, sidebarIcon, sidebarNumber, sidebarIconAmount, isVisible, activePage, cartPopup, setCartPopup, bottomBar, setBottomBar, setIsMobileMenuOpen } = useGlobalContext();

    // Calculate the total number of items in the cart
    const totalItemsInCart = state.cart.reduce((acc, item) => acc + item.
        amount, 0);

    // callback function to close cart from inside cart component
    const handleCartClose = () => {
        setCartPopup(false)
    }
    const handleCartOpenFromPage = () => {
        setCartPopup(true)
        setIsMobileMenuOpen(true)
    }

    return (
        <>
            <aside>
                <div className="relative-sidebar-spot">
                    <div className="cart-btn-container"
                        onClick={() => setCartPopup(true)}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg>
                        <div className="cart-amount"><p>{totalItemsInCart}</p></div>
                    </div>
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
                </div>
                <div className="sidebar">
                    <p className={`sidebar-text ${isVisible ? 'visible' : ''}`}
                    >{sidebarText}</p>

                    {[...Array(sidebarIconAmount)].map((_, index) => (
                        <div
                            key={`sidebarIcon_${index}`}
                            className={`page-locator ${sidebarIcon === index + 1 ? 'active-location' : ''}`}

                            onClick={() => handleScrollTo(activePage, index)}

                        ></div>
                    ))}
                    <p className={`sidebar-text ${isVisible ? 'visible' : ''}`}>{sidebarNumber}</p>
                </div>
            </aside>

            <section className={bottomBar ? "bottom-bar slide-in" : "bottom-bar"}>
                <div className="bottom-btn-wrapper">
                    <button className="bottom-checkout-btn" onClick={() => handleCartOpenFromPage()}>Checkout</button>
                    <div className="cart-btn-container"
                        onClick={() => handleCartOpenFromPage()}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path></svg>
                        <div className="cart-amount"><p>{totalItemsInCart}</p></div>
                    </div>
                </div>
                <button onClick={() => setBottomBar(false)} className="clear-btn">Keep<br></br>Browsing</button>
            </section>
        </>
    )
}

Sidebar.propTypes = {
    state: statePropTypes,
    handleAddToCart: PropTypes.func,
    handleIncrease: PropTypes.func,
    handleDecrease: PropTypes.func,
    handleRemoveItem: PropTypes.func,
    handleClearCart: PropTypes.func,
    isMobileMenuOpen: PropTypes.bool,
    setIsMobileMenuOpen: PropTypes.func
};

export default Sidebar