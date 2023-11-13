import { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductsCarousel = ({ data, categories }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

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

    const reducedData = data.filter((item) => item.category === 'jewelery');
    console.log(reducedData);


    return (
        <section className="products-carousel">
            <h2>womans jewelery</h2>
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
    );
};

export default ProductsCarousel;
