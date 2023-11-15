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

    const handleScrollTo = (pageIndex, index) => {
        const selectedTextRefs = pageTextRefs[pageIndex];
        console.log('selectedTextRefs:', selectedTextRefs);

        if (selectedTextRefs && selectedTextRefs[index] && selectedTextRefs[index].current) {
            const scrollToIndex = index > 0 ? index - 1 : index;
            console.log('scrollToIndex:', scrollToIndex);

            const targetRef = selectedTextRefs[scrollToIndex];
            console.log('targetRef:', targetRef);

            if (targetRef && targetRef.current) {
                const { top } = targetRef.current.getBoundingClientRect();
                console.log('top:', top);

                window.scrollTo({
                    top: window.scrollY + top,
                    behavior: 'smooth',
                });
            } else {
                console.log('targetRef.current is null or undefined');
            }
        }
        console.log('click', 'on page:', pageIndex, 'index=', index);
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
            activePage,
            setActivePage,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, AppContext };