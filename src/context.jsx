import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [scrollTarget, setScrollTarget] = useState(null);
    const [page, setPage] = useState('home')
    const [sidebarText, setSidebarText] = useState('scroll down')
    const [sidebarIcon, setSidebarIcon] = useState(1)
    const [sidebarNumber, setSidebarNumber] = useState('01')
    const [sidebarIconAmount, setSidebarIconAmount] = useState(4)
    const [isVisible, setIsVisible] = useState(true)
    const [pageTextRefs, setPageTextRefs] = useState({});
    const [activePage, setActivePage] = useState('home');
    const [cartPopup, setCartPopup] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


    // scroll functionality for sidebar icons
    const handleScrollTo = (activePage, index) => {
        let scrollPoint = document.getElementById(`${activePage}${index}`)
        if (scrollPoint) {
            const { top } = scrollPoint.getBoundingClientRect();

            window.scrollTo({
                top: window.scrollY + top,
                behavior: 'smooth',
            });
        }
    };


    return (
        <AppContext.Provider value={{
            scrollTarget, setScrollTarget,
            page, setPage,
            sidebarText, setSidebarText,
            sidebarIcon, setSidebarIcon,
            sidebarNumber, setSidebarNumber,
            sidebarIconAmount, setSidebarIconAmount,
            isVisible, setIsVisible,
            handleScrollTo, pageTextRefs, setPageTextRefs,
            activePage, setActivePage,
            cartPopup, setCartPopup,
            isMobileMenuOpen, setIsMobileMenuOpen
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, AppContext };