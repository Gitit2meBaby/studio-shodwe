# Studio Shodwe

Aims for this project are to create a visually appealing e-commerce site, minimal layout but with some nice UI tricks to keep it interesting. Dynamic Cart updating, form validation etc.
Have fallen short on integrating the stripe payment gateway as I think for a portfolio project it's not really going to be a game changer.

## API
The fakeStore API is pretty limited, could not find a better alternative and could be nice just to create my own on Postman to pad out the categories a bit more.

Currently just iterating over available 20 returned to create the header categories and populate the product content.

## React
See the need from the last few projects to get a handle on useReducer to limit my API calls and spread global state without causing rerenders anytime someone so much as glances at an icon.
Ended up requiring a global context but contained API fetch succesfully.

## Framer Motion
I began the project using interaction observers in order to create some subtle animations and update the sidebar as the user scrolls.
However I looked into framer motion and found it to be 10x simpler to use and finished the project using that package to implement page transitions.
Still using a 'vanilla' type approach for scrollTo functionality which could be updated in the future although still doesn't feel like it takes to many lines of code to implement.

# React Slick
This package saved a lot of time for the carousel function and though it felt a little like cheating it certainly cut down on excess code and I will definately be using it more in the future, there are still some quirks when it comes to the CSS targeting but a little more of a deep dive into the package and I think it is a great tool in the arsenal.

# Lessons Learnt...
A bit more planning would not of gone a stray when it came to the cart, I designed on desktop and had a funky scrollbar to show the cart icon at all times and naturally put the cart component there also.
However come mobile time I realised I wanted to have it in the mobile Navigation and this has led to a bit of prop drilling that could have been avoided.
Also responsive design wise the hover states that reveal extra information are obviously rendered useless on mobile and implementing a different UI design has proven tricky, this could have been avoided with some more forethought.

The hero section of each page I think came out nicely on desktop but appears boring on mobile, given more time on this project I think removing the grids and creating entirely new hero's for mobile would be a wise move.

Searching for the right packages has also shown me that there is a lot of 'vanilla' code that I do not really need to implement if I just get to know some more tools rather than shying away from them.