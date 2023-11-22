// animations.js
export const slideInLeft = {
    initial: { transform: "translateX(-40%)", opacity: 0, transition: { duration: 0.5 } },
    animate: { transform: "translateX(0%)", opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
    exit: { transform: "translateX(-40%)", opacity: 0, transition: { duration: 0.5 } },
};

export const slideInRight = {
    initial: { transform: "translateX(40%)", opacity: 0, transition: { duration: 0.5 } },
    animate: { transform: "translateX(0%)", opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
    exit: { transform: "translateX(40%)", opacity: 0, transition: { duration: 0.5 } },
};

export const slideInUp = {
    initial: { transform: "translateY(40%)", opacity: 0, transition: { duration: 0.5 } },
    animate: { transform: "translateY(0%)", opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
    exit: { transform: "translateY(40%)", opacity: 0, transition: { duration: 0.5 } },
};

export const slideInDown = {
    initial: { transform: "translateY(-40%)", opacity: 0, transition: { duration: 0.5 } },
    animate: { transform: "translateY(0%)", opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
    exit: { transform: "translateY(-40%)", opacity: 0, transition: { duration: 0.5 } },
};

export const slideInDown1 = {
    initial: { transform: "translateY(-40%)", opacity: 0, transition: { duration: 0.5, delay: 0.2 } },
    animate: { transform: "translateY(0%)", opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
    exit: { transform: "translateY(-40%)", opacity: 0, transition: { duration: 0.1, delay: 0.1 } },
};
export const slideInDown2 = {
    initial: { transform: "translateY(-40%)", opacity: 0, transition: { duration: 0.5, delay: 0.4 } },
    animate: { transform: "translateY(0%)", opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
    exit: { transform: "translateY(-40%)", opacity: 0, transition: { duration: 0.1, delay: 0.2 } },
};
export const slideInDown3 = {
    initial: { transform: "translateY(-40%)", opacity: 0, transition: { duration: 0.5, delay: 0.6 } },
    animate: { transform: "translateY(0%)", opacity: 1, transition: { duration: 0.5, delay: 0.6 } },
    exit: { transform: "translateY(-40%)", opacity: 0, transition: { duration: 0.1, delay: 0.3 } },
};
export const slideInDown4 = {
    initial: { transform: "translateY(-40%)", opacity: 0, transition: { duration: 0.5, delay: 0.8 } },
    animate: { transform: "translateY(0%)", opacity: 1, transition: { duration: 0.5, delay: 0.8 } },
    exit: { transform: "translateY(-40%)", opacity: 0, transition: { duration: 0.1, delay: 0.4 } },
};

export const textFadeInDelay1 = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
};

export const textFadeInDelay2 = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, delay: .6 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const textFadeInDelay3 = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, delay: .8 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const textFadeInDelay4 = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, delay: 1 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
};
export const textFadeInDelay5 = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, delay: 1.2 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
};

export const textColorFade = {
    initial: { color: "white" },
    animate: { color: "black", transition: { duration: 0.5 } },
    exit: { color: "white" },
    transition: { delay: 1.5 },
};

