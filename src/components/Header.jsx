import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from '../assets/logo250.webp';

const Header = ({ state }) => {
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [brief, setBrief] = useState([]);
    const [remainder, setRemainder] = useState([]);
    const [mobMenu, setMobMenu] = useState(false)

    const { data, categories } = state;

    useEffect(() => {
        if (data && data.length > 0) {
            const briefTitles = data.map((item) => {
                const words = item.title.split(' ');
                const brief = words.slice(0, 4).join(' ');
                const remainder = words.slice(4).join(' ');
                return { brief, remainder };
            });

            // Extract brief and remainder into separate arrays
            const briefArray = briefTitles.map((title) => title.brief);
            const remainderArray = briefTitles.map((title) => title.remainder);

            // Set the state with the accumulated arrays
            setBrief(briefArray);
            setRemainder(remainderArray);
        }
    }, [data]);

    const handleToggleDropdown = (category) => {
        setOpenDropdowns((prevOpenDropdowns) => ({
            ...prevOpenDropdowns,
            [category]: true,
        }));
    }

    const handleMouseLeave = (category) => {
        setOpenDropdowns((prevOpenDropdowns) => ({
            ...prevOpenDropdowns,
            [category]: false,
        }))
    }

    const handleMouseEnter = (category) => {
        setOpenDropdowns((prevOpenDropdowns) => ({
            ...prevOpenDropdowns,
            [category]: true,
        }))
    }

    return (
        <header>
            <Link to={'/'}><div className="logo-container">
                <img src={logo} alt="studio shodwe logo" />
            </div></Link>
            {data && data.length > 0 ? (
                categories.map((category) => (
                    <div className="nav-item" key={category}
                        onMouseEnter={() => handleToggleDropdown(category)}
                        onMouseLeave={() => handleMouseLeave(category)}>
                        <NavLink to={category}><button>
                            {category}
                        </button></NavLink>
                        {openDropdowns[category] && (
                            <div className="nav-dropdown" onMouseEnter={() => handleMouseEnter(category)} onMouseLeave={() => handleMouseLeave(category)}>
                                {data
                                    .filter((product) => product.category === category)
                                    .map((product) => (
                                        <React.Fragment key={product.id}>
                                            <NavLink to={`/${category}`}><p value={product.id} >
                                                {brief[data.indexOf(product)]}
                                            </p></NavLink >
                                        </React.Fragment>
                                    ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No data available.</p>
            )}
            <div className="toggle"
                onClick={() => setMobMenu(!mobMenu)}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg"><path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path></svg>
            </div>
            <nav className={mobMenu ? "mobile-menu slide-in" : "mobile-menu"}>
                <svg onClick={() => setMobMenu(!mobMenu)} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg"><path d="M354 671h58.9c4.7 0 9.2-2.1 12.3-5.7L512 561.8l86.8 103.5c3 3.6 7.5 5.7 12.3 5.7H670c6.8 0 10.5-7.9 6.1-13.1L553.8 512l122.4-145.9c4.4-5.2.7-13.1-6.1-13.1h-58.9c-4.7 0-9.2 2.1-12.3 5.7L512 462.2l-86.8-103.5c-3-3.6-7.5-5.7-12.3-5.7H354c-6.8 0-10.5 7.9-6.1 13.1L470.2 512 347.9 657.9A7.95 7.95 0 0 0 354 671z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
                {data && data.length > 0 ? (
                    categories.map((category) => (
                        <div className="mob-nav-item" key={category}>
                            <NavLink to={category}>
                                <button onClick={() => setMobMenu(!mobMenu)}>
                                    {category}
                                </button>
                            </NavLink>
                        </div>
                    ))
                ) : null}
                <Link onClick={() => setMobMenu(!mobMenu)} to={'/'}> <img src={logo} alt="studio shodwe logo" /></Link>

            </nav>

        </header>
    );

};

export default Header;
