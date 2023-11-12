import { useState } from "react";
import logo from '../assets/logo250.webp';

const Header = ({ state }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const { data, categories } = state;

    return (
        <header>
            <div className="logo-container">
                <img src={logo} alt="studio shodwe logo" />
            </div>
            {data && data.length > 0 ? (
                categories.map((category) => (
                    <div key={category}>
                        <button onClick={() => setShowDropdown(!showDropdown)}>
                            {category}
                        </button>
                        {showDropdown && (
                            <div className="nav-dropdown">
                                {data
                                    .filter((product) => product.category === category)
                                    .map((product) => (
                                        <p key={product.id} value={product.id}>
                                            {product.title}
                                        </p>
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
