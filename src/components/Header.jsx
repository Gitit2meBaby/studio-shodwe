import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from '../assets/logo250.webp';

const Header = ({ state }) => {
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [brief, setBrief] = useState([]);
    const [remainder, setRemainder] = useState([]);

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
        </header>
    );

};

export default Header;
