import { useState, useRef, useEffect } from 'react'

import mensFashion from '../assets/mens-fashion.webp'
import mensClothes from '../assets/mens-clothes.webp'
import apparel from '../assets/apparel.webp'
import logo from '../assets/logo600.webp'

const MensBanner = () => {
    const [isObserved, setIsObserved] = useState(false)
    const arrowContainers = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsObserved(true)
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        if (arrowContainers.current) {
            observer.observe(arrowContainers.current);
        }

        return () => {
            if (arrowContainers.current) {
                setIsObserved(false)
                observer.unobserve(arrowContainers.current);
            }
        };
    }, []);

    return (
        <>
            <section className="mens-banner">
                <div ref={arrowContainers} className="mini-grid">
                    <div className={`mini-arrow-container${isObserved ? " slide-in-slow-speed" : ""}`}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg></div>
                    <div className={`mini-arrow-container reverse-arrow ${isObserved ? "slide-in-med-speed" : ""}`}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg></div>
                    <div className={`mini-arrow-container${isObserved ? " slide-in" : ""}`}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg></div>
                    <img src={mensClothes} alt="clothes hanging in wardrobe" />
                </div>
                <div className="banner-content">
                    <div>
                        <img src={apparel} alt="random fashionable items" />
                        <div className={`mini-arrow-container${isObserved ? " slide-in too-black" : ""}`}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg></div>
                    </div>
                    {/* <div className='banner-text'><h2>Browse All</h2></div> */}
                </div>
                <div className="boys-img">
                    <h2>Mens Wear</h2>
                </div>
            </section>
            <div className='jewellry-link' id='mensLink'>
                <div><h2>See collection</h2></div>
                <div className='arrow-div'><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg></div>
            </div>
        </>
    )
}

export default MensBanner