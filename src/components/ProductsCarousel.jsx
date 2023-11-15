import { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from "../context"
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductsCarousel = ({ data }) => {
    const {
        scrollTarget, setScrollTarget, setPage,
        setSidebarText, setSidebarIcon, setSidebarNumber, setIsVisible
    } = useGlobalContext();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [reducedData, setReducedData] = useState([]);

    const carouselSection = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setPage('home')
                        setSidebarText("Jewelery");
                        setSidebarIcon(3);
                        setSidebarNumber('03');
                        setIsVisible(true)
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '150px 0px 0px 0px',
            }
        );

        if (carouselSection.current) {
            observer.observe(carouselSection.current);
        }

        return () => {
            if (carouselSection.current) {
                setIsVisible(false)
                observer.unobserve(carouselSection.current);
            }
        };
    }, [carouselSection, setPage, setSidebarText, setSidebarIcon, setSidebarNumber]);

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 4000,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        pauseOnHover: true,
        lazyLoad: true,
        centerMode: true,
        initialSlide: 2,
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        afterChange: (current) => setCurrentSlide(current),
    };

    useEffect(() => {
        // Check if data exists before filtering
        if (data && data.length > 0) {
            const filteredData = data.filter((item) => item.category === 'jewelery');
            setReducedData(filteredData);
        }
    }, [data]);

    return (
        <>
            <section ref={carouselSection} className="products-carousel">
                <h2>womens jewelery</h2>
                <Slider {...settings}>
                    {reducedData &&
                        reducedData.length > 0 &&
                        reducedData.map((product, index) => (
                            <div key={product.id} className="slider-img">
                                <img src={product.image} alt={product.title} />
                                {currentSlide === index && (
                                    <div className="slider-hover-div">
                                        <p>${product.price}</p>

                                    </div>
                                )}
                            </div>
                        ))}
                </Slider>
            </section>
            <div className='jewellry-link'>
                <div><h2>See collection</h2></div>
                <div className='arrow-div'><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg></div>
            </div>
        </>
    );
};

export default ProductsCarousel;
