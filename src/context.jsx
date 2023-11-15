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

    const handleScrollTo = (page, ref) => {
        setPage(page);
        setScrollTarget(ref);
        window.scrollTo({
            top: scrollTarget.current.offsetTop,
            behavior: "smooth"
        })
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
            handleScrollTo,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, AppContext };