import React from 'react';

const Cart = ({ cart, total, cartPopup, handleRemoveItem, handleClearCart, handleDecrease, handleIncrease }) => {
    console.log("cart:", cart);
    console.log("total:", total);
    console.log(cartPopup);

    return (
        <>
            {cartPopup && (
                <div className="cart-modal">
                    <div className="cart-head">
                        <h3>Your Cart</h3>
                    </div>
                    <div className="cart-items" >
                        {cart.length > 0 ? cart.map((item, index) => (
                            <div className="cart-item" key={index}>
                                <div className='cart-content'>
                                    <img src={item.image} alt={item.title} />
                                    <div className="item-details">
                                        <h2>{item.title}</h2>
                                        <p>${item.price}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="amounts-container">
                                        <svg onClick={(e,) => handleIncrease(e, item.id)} stroke="currentColor" fill="currentColor" strokeWidth="1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" clipRule="evenodd"></path></svg>
                                        <p>{item.amount}</p>
                                        <svg onClick={(e,) => handleDecrease(e, item.id)} stroke="currentColor" fill="currentColor" strokeWidth="1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clipRule="evenodd"></path></svg>
                                    </div>

                                </div>
                            </div>
                        )) : (
                            <p>No items in your cart...</p>
                        )}

                    </div>
                    <div className="cart-total">
                        <h3><span>Total:</span> ${parseFloat(total.toFixed(2))}</h3>
                    </div>
                    <div className="cart-foot">
                        <button onClick={() => handleClearCart()} className="clear-btn">Clear All</button>
                        <button className="add-cart-btn checkout-btn">Checkout</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
