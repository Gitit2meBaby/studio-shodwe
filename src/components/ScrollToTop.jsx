import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// to make sure return to home is at top of page
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
