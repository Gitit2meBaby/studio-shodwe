import { useState } from 'react';

const Cart = ({ cart, total, cartPopup, setCartPopup, handleClearCart, handleDecrease, handleIncrease, handleCartClose }) => {

    const [checkout, setCheckout] = useState(false)
    const [shippingFree, setShippingFree] = useState(false)
    const [payment, setPayment] = useState(false)
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        phoneNumber: '',
        email: ''
    });

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

    let finalTotal = total + 35
    if (total >= 100) {
        finalTotal = total
    }
    const handleDetailsBackBtn = () => {
        setCheckout(true)
        setPayment(false)

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormVerification = () => {

        const errors = {};
        const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
        const postcodeRegex = /^[0-9]{4,5}$/;
        const emailRegex = /^\S+@\S+\.\S+$/;


        // Validate each field
        if (formData.fullName.trim() === '') {
            errors.fullName = 'Please enter your name';
        }
        if (formData.address.trim() === '') {
            errors.address = 'Please enter a valid address';
        }
        if (formData.city.trim() === '') {
            errors.city = 'Please enter a city';
        }
        if (formData.postalCode.trim() === '') {
            errors.postalCode = 'Please enter a postal code';
        } else if (!postcodeRegex.test(formData.postalCode.trim())) {
            errors.postalCode = 'Please enter a valid postal code (4-5 digits)';
        }
        if (formData.phoneNumber.trim() === '') {
            errors.phoneNumber = 'Please enter a phone number';
        } else if (!phoneRegex.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Please enter a valid phone number';
        }
        if (formData.email.trim() === '') {
            errors.email = 'Please enter an email';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email';
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setPayment(true)
            setCheckout(false)
        }
    };

    const handleDetailsReview = () => {
        setCheckout(false)
        setPayment(false)
        setCartPopup(false)
        setShippingFree(false)
        handleClearCart()
        setFormData({
            fullName: '',
            address: '',
            city: '',
            postalCode: '',
            phoneNumber: '',
            email: ''
        })
    }


    return (
        <>
            {cartPopup && (
                <div className="cart-modal">
                    <div className="cart-head">
                        <h3>{!checkout && !payment ? 'Your Cart' : (checkout && !payment ? 'Checkout' : 'Review')}</h3>
                        <svg onClick={() => handleCartClose()} stroke="currentColor" fill="currentColor" strokeWidth="1" viewBox="0 0 1024 1024" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M354 671h58.9c4.7 0 9.2-2.1 12.3-5.7L512 561.8l86.8 103.5c3 3.6 7.5 5.7 12.3 5.7H670c6.8 0 10.5-7.9 6.1-13.1L553.8 512l122.4-145.9c4.4-5.2.7-13.1-6.1-13.1h-58.9c-4.7 0-9.2 2.1-12.3 5.7L512 462.2l-86.8-103.5c-3-3.6-7.5-5.7-12.3-5.7H354c-6.8 0-10.5 7.9-6.1 13.1L470.2 512 347.9 657.9A7.95 7.95 0 0 0 354 671z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
                    </div>

                    {!checkout && !payment && (
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
                    {!checkout && !payment && (
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
                                        <input onChange={(e) => handleInputChange(e)} type="text" id="fullName" name="fullName" required
                                            className={formErrors.fullName ? 'error' : ''}
                                            placeholder={formErrors.fullName ? '*Please enter your name' : ''}

                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input onChange={(e) => handleInputChange(e)} type="text" id="address" name="address" required
                                            className={formErrors.address ? 'error' : ''}
                                            placeholder={formErrors.address ? '*Please enter a valid address' : ''} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input onChange={(e) => handleInputChange(e)} type="text" id="city" name="city" required
                                            className={formErrors.city ? 'error' : ''}
                                            placeholder={formErrors.city ? '*Please enter your city' : ''} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="postalCode">Postal Code</label>
                                        <input onChange={(e) => handleInputChange(e)} type="text" id="postalCode" name="postalCode"
                                            className={formErrors.postalCode ? 'error' : ''}
                                            placeholder={formErrors.postalCode ? '*Please enter a valid post Code' : ''} required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <input onChange={(e) => handleInputChange(e)} type="tel" id="phoneNumber"
                                            name="phoneNumber" className={formErrors.phoneNumber ? 'error' : ''}
                                            placeholder={formErrors.phoneNumber ? '*Please enter a valid phone number' : '+12 345 678 901'} required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input onChange={(e) => handleInputChange(e)} type="email" id="email"
                                            name="email" required
                                            className={formErrors.email ? 'error' : ''}
                                            placeholder={formErrors.email ? '*Please enter a valid email' : 'ie janedoe@email.com'}
                                        />
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
                                <h3><span>Total:</span> ${parseFloat(finalTotal.toFixed(2))}</h3>
                            </div>
                            <div className="cart-foot">
                                <button onClick={() => handleFormVerification()} className='checkout-btn' type="submit">Review & Payment</button>
                                <button onClick={(e) => handleBackBtn(e)} className="clear-btn">Back</button>
                            </div>
                        </>
                    )}

                    {payment && (
                        <>
                            <div className="shipping-info">
                                <div className="details">
                                    <h2>Please review your Details</h2>
                                    <p>{formData.fullName}</p>
                                    <p>{formData.address}</p>
                                    <p>{formData.city}</p>
                                    <p>{formData.postalCode}</p>
                                    <p>{formData.phoneNumber}</p>
                                    <p>{formData.email}</p>
                                </div>
                                <div className="payment">
                                    <h2>Your Cart</h2>
                                    {cart.map((item, index) => (
                                        <div className="final-list-item" key={item.index}>
                                            <p>{item.title}</p>
                                            <p>x {item.amount}</p>
                                            <p>${item.price}</p>
                                        </div>
                                    ))}
                                    <p>Shipping {!shippingFree ? '$35' : '$0'}</p>
                                    <h3>Total ${parseFloat(finalTotal.toFixed(2))}</h3>
                                </div>
                            </div>
                            <div className="cart-foot">
                                <button onClick={() => handleDetailsReview()} className='checkout-btn' type="submit">Proceed</button>
                                <button onClick={(e) => handleDetailsBackBtn(e)} className="clear-btn">Back</button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Cart;
