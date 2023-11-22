import featureBG from '../assets/feature-bg.webp'
import secondary from '../assets/secondary600.webp'
import { useGlobalContext } from "../context"
import { useEffect, useRef } from 'react'
import { motion, transform } from 'framer-motion'
import { slideInLeft, slideInUp, slideInDown, slideInRight, textFadeInDelay1, textFadeInDelay2, textFadeInDelay3, textFadeInDelay4, textFadeInDelay5 } from '../animations'


const Hero = () => {
    const {
        scrollTarget, setScrollTarget, setPage, sidebarText, setSidebarText, sidebarIcon, setSidebarIcon,
        sidebarNumber, setSidebarNumber,
        sidebarIconAmount, setSidebarIconAmount, setIsVisible
    } = useGlobalContext();

    const hero = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setPage('home')
                        setSidebarText("Scroll Down");
                        setSidebarIcon(1);
                        setSidebarIconAmount(4);
                        setSidebarNumber('01');
                        setIsVisible(true);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px 0px 0px 0px',
            }
        );

        // Check if firstSection.current is not null before observing
        if (hero.current) {
            observer.observe(hero.current);
        }

        // Cleanup function
        return () => {
            // Check if firstSection.current is not null before unobserving
            if (hero.current) {
                setIsVisible(false)
                observer.unobserve(hero.current);
            }
        };
    }, [hero.current, setPage, setSidebarText, setSidebarIcon, setSidebarNumber, setSidebarIconAmount]);

    return (
        <motion.section className='hero'>

            <motion.div className='feature-img'
                {...slideInLeft}
            >
                <motion.h1
                    {...textFadeInDelay3}>Shodwe<br></br>E-MAGZ</motion.h1>
                <motion.p
                    {...textFadeInDelay4}>Find Inspirations to styling dress and upgrade your outfit</motion.p>
                <motion.button ref={hero}
                    {...textFadeInDelay5}>SHOW ME</motion.button>
            </motion.div>

            <motion.div className='secondary-img'
                {...slideInDown}>
                {/* <img src={secondary} alt="group of people posing" /> */}
            </motion.div>

            <div className="graphics-container">
                <motion.div className='arrow-container'
                    {...slideInUp}>
                    <motion.svg

                        stroke="#fff"
                        fill="#fff"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path>
                    </motion.svg>
                </motion.div>

                <motion.div className="read-container"
                    {...slideInRight}>
                    <motion.h2
                    >READ MAGZ</motion.h2>
                </motion.div>
            </div>
        </motion.section>
    )
}

export default Hero