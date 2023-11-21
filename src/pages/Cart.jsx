import { useState } from 'react';

const Cart = ({ cart, total, cartPopup, handleClearCart, handleDecrease, handleIncrease, handleCartClose }) => {

    const [checkout, setCheckout] = useState(false)
    const [shippingFree, setShippingFree] = useState(false)

    const handleCheckOut = () => {
        if (cart.length >= 1) {
            setCheckout(true)
        }
        if (total >= 100) {
            setShippingFree(true)
        } else {
            setShippingFree(false)
        }
    }

    const handleBackBtn = () => {
        setCheckout(false)
    }

    return (
        <>
            {cartPopup && (
                <div className="cart-modal">
                    <div className="cart-head">
                        <h3>{!checkout ? 'Your Cart' : 'Checkout'}</h3>
                        <svg onClick={() => handleCartClose()} stroke="currentColor" fill="currentColor" strokeWidth="1" viewBox="0 0 1024 1024" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M354 671h58.9c4.7 0 9.2-2.1 12.3-5.7L512 561.8l86.8 103.5c3 3.6 7.5 5.7 12.3 5.7H670c6.8 0 10.5-7.9 6.1-13.1L553.8 512l122.4-145.9c4.4-5.2.7-13.1-6.1-13.1h-58.9c-4.7 0-9.2 2.1-12.3 5.7L512 462.2l-86.8-103.5c-3-3.6-7.5-5.7-12.3-5.7H354c-6.8 0-10.5 7.9-6.1 13.1L470.2 512 347.9 657.9A7.95 7.95 0 0 0 354 671z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
                    </div>

                    {!checkout && (
                        <div className="cart-items">
                            {cart.length > 0 ? (
                                cart.map((item, index) => (
                                    <div className="cart-item" key={index}>
                                        <div className='cart-content'>
                                            <img src={item.image} alt={item.title} />
                                            <div className="item-details">
                                                <h2>{item.title}</h2>
                                                <p>${item.price}</p>
                                            </div>
                                        </div>
                                        <div className="amounts-container">
                                            <svg onClick={(e,) => handleIncrease(e, item.id)} stroke="currentColor" fill="currentColor" strokeWidth="1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" clipRule="evenodd"></path></svg>
                                            <p>{item.amount}</p>
                                            <svg onClick={(e,) => handleDecrease(e, item.id)} stroke="currentColor" fill="currentColor" strokeWidth="1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clipRule="evenodd"></path></svg>
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <p>No items in your cart...</p>
                            )}
                        </div>
                    )}
                    {!checkout && (
                        <>
                            <div className="cart-total">
                                <h3><span>Total:</span> ${parseFloat(total.toFixed(2))}</h3>
                            </div>
                            <div className="cart-foot">
                                <button onClick={() => handleClearCart()} className="clear-btn">Clear All</button>
                                <button onClick={() => handleCheckOut()} className="checkout-btn">Checkout</button>
                            </div>
                        </>
                    )}

                    {checkout && (
                        <>
                            <div className="shipping-info">
                                <h2>Shipping Information</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="fullName">Full Name</label>
                                        <input type="text" id="fullName" name="fullName" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" id="address" name="address" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input type="text" id="city" name="city" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="postalCode">Postal Code</label>
                                        <input type="text" id="postalCode" name="postalCode" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <input type="tel" id="phoneNumber"
                                            placeholder='+12 345 678 901' name="phoneNumber" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email"
                                            placeholder='ie janedoe@email.com'
                                            name="email" required />
                                    </div>
                                </form>
                            </div>
                            <div className="cart-total">
                                {!shippingFree ? (<h3><span>Shipping:</span> $35</h3>
                                ) : (<>
                                    <h4>Free shipping on orders over $99!</h4>
                                    <h3><span>Shipping:</span><span id='freeShip'> $35</span></h3>
                                </>
                                )}
                                <h3><span>Total:</span> ${parseFloat(total.toFixed(2))}</h3>
                            </div>
                            <div className="cart-foot">
                                <button className='checkout-btn' type="submit">Review & Payment</button>
                                <button onClick={(e) => handleBackBtn(e)} className="clear-btn">Back</button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Cart;
