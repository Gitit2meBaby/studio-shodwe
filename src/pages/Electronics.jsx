import { useState, useEffect, useRef } from 'react';
import gadgets from '../assets/gadgets800.webp';
import person from '../assets/person-with-phone400.webp';

const Electronics = ({ data }) => {
    const [electronics, setElectronics] = useState([]);
    const [isIntersecting, setIsIntersecting] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isIntersecting && ref.current) {
            ref.current.querySelectorAll(".slide").forEach((el) => {
                el.classList.add("slide-in");
            });
        } else if (ref.current) {
            ref.current.querySelectorAll(".slide").forEach((el) => {
                el.classList.remove("slide-in");
            });
        }
    }, [isIntersecting]);
    // filter out electronics from data array
    useEffect(() => {
        if (data && data.length > 0) {
            const electronics = data.filter((item) => item.category === 'electronics');
            setElectronics(electronics);
        }
    }, [data]);

    return (
        <section className="electronics">
            <div className="electronics-grid">
                <div className="title">
                    <h1>Electronics</h1>
                </div>

                <div className='electronic-feature'>
                    <img src={gadgets} alt="technology gadgets on a table" />
                    <p>Learn..</p><p>Play...</p> <p>Discover.</p>
                    <button className='text-btn'>Show Tech</button>
                </div>

                <div className="inner-grid">
                    <div className="person-img">
                        <img src={person} alt="person with phone" />
                    </div>
                    <div className="arrows">
                        <div className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></div>
                        <div className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></div>
                        <div className="arrow-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></div>
                    </div>
                </div>
            </div>

            {electronics &&
                electronics.length > 0 &&
                electronics.map((product, index) => {
                    const words = product.title.split(' ');
                    const firstWord = words.shift();
                    const titleRemainder = words.join(' ');

                    return (
                        <div className={`primary page-layout ${index % 2 === 1 ? 'second-row' : ''}`}
                            key={product.id}
                            ref={ref}>
                            <img src={product.image}
                                alt={product.title}
                                className={`'slide ${index % 2 === 1 ? 'off-right' : 'off-left'}`}
                            />
                            <div className="primary-content page-content">
                                <h2>{firstWord}</h2>
                                <h3>{titleRemainder}</h3>
                                <h4>${product.price}
                                    <span>{`   $${(product.price * 1.1).toFixed(2)}`}</span>
                                </h4>
                                <p>{product.description}</p>
                                <div className="btn-container">
                                    <button className='add-cart-btn'>Add To Cart</button>
                                </div>              </div>
                        </div>
                    );
                })}
        </section>
    );
}

export default Electronics;