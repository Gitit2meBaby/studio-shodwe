import featureBG from '../assets/feature-bg.webp'
import secondary from '../assets/secondary600.webp'

const Hero = () => {
    return (
        <section className='hero'>

            <div className='feature-img'>
                <h1>Shodwe<br></br>E-MAGZ</h1>
                <p>Find Inspirations to styling dress and upgrade your outfit</p>
                <button>Read More</button>
            </div>

            <div className='secondary-img'>
                {/* <img src={secondary} alt="group of people posing" /> */}
            </div>

            <div className="graphics-container">
                <div className='arrow-container'>
                    <svg
                        stroke="#fff"
                        fill="#fff"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path>
                    </svg>
                </div>

                <div className="read-container">
                    <h2>READ MAGZ</h2>
                </div>
            </div>
        </section>
    )
}

export default Hero