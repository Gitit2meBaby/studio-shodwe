import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo250.webp';

const Header = ({ state }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [brief, setBrief] = useState([]);
    const [remainder, setRemainder] = useState([]);
    const [hoveredProductId, setHoveredProductId] = useState(null);

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

    const handleMoreContent = (productId) => {
        setHoveredProductId(productId);
    }

    return (
        <header>
            <div className="logo-container">
                <img src={logo} alt="studio shodwe logo" />
            </div>
            {data && data.length > 0 ? (
                categories.map((category) => (
                    <div className="nav-item" key={category}>
                        <button onClick={() => setShowDropdown(!showDropdown)}>
                            {category}
                        </button>
                        {showDropdown && (
                            <div className="nav-dropdown">
                                {data
                                    .filter((product) => product.category === category)
                                    .map((product) => (
                                        <React.Fragment key={product.id}>
                                            <p
                                                value={product.id}
                                                onMouseOver={() => handleMoreContent(product.id)}
                                            >
                                                {brief[data.indexOf(product)]}
                                            </p>
                                            {hoveredProductId === product.id && (
                                                <p value={product.id}
                                                    style={{
                                                        backgroundColor: '#E8CA00', margin: '0',
                                                        padding: '0 2rem'
                                                    }}>
                                                    {remainder[data.indexOf(product)]}
                                                </p>
                                            )}
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
