import { useEffect, useReducer } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useGlobalContext } from "./context"
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop'
import ProductsDisplay from './components/ProductsDisplay';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import MensBanner from './components/MensBanner';
import ProductsCarousel from './components/ProductsCarousel'
import Electronics from './pages/Electronics';
import WomensClothing from './components/WomensClothing';
import Footer from './components/Footer';
import Jewelery from './pages/Jewelery';
import MensClothing from './pages/MensClothing';
import Cart from './pages/Cart';
import Womens from './pages/Womens';
import Payment from './pages/Payment';

const initialState = {
  loading: false,
  data: null,
  categories: [],
  error: null,
  cart: [],
  total: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS': {
      const uniqueCategories = Array.from(new Set(action.payload.map((product) => product.category)));
      return { ...state, loading: false, data: action.payload, categories: uniqueCategories, error: null };
    }
    case 'FETCH_ERROR':
      return { ...state, loading: false, data: null, categories: [], error: action.payload };
    case 'ADD_TO_CART': {
      const { id } = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.id === id);

      if (existingItemIndex !== -1) {
        const updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex ? { ...item, amount: item.amount + 1 } : item
        );
        const newTotal = updatedCart.reduce((acc, item) => acc + item.price * item.amount, 0);

        return {
          ...state,
          cart: updatedCart,
          total: newTotal,
        };
      } else {
        const newItem = {
          ...action.payload,
          amount: 1,
        };
        const updatedCart = [...state.cart, newItem];
        const newTotal = updatedCart.reduce((acc, item) => acc + item.price * item.amount, 0);

        return {
          ...state,
          cart: updatedCart,
          total: newTotal,
        };
      }
    }

    case 'INCREASE': {
      const idToIncrease = action.payload.id;
      const increasedExistingItemIndex = state.cart.findIndex(item => item.id === idToIncrease);

      if (increasedExistingItemIndex !== -1) {
        const updatedCart = state.cart.map((item, index) =>
          index === increasedExistingItemIndex ? { ...item, amount: item.amount + 1 } : item
        );

        const newTotal = updatedCart.reduce(
          (acc, item) => acc + item.price * item.amount,
          0
        );

        return {
          ...state,
          cart: updatedCart,
          total: newTotal,
        };
      }

      return state;
    }
    case 'DECREASE': {
      const idToDecrease = action.payload.id;
      const decreasedExistingItemIndex = state.cart.findIndex(item => item.id === idToDecrease);

      if (decreasedExistingItemIndex !== -1) {
        const updatedCart = state.cart.map((item, index) =>
          index === decreasedExistingItemIndex ? { ...item, amount: item.amount - 1 } : item
        );

        const decreasedItem = state.cart[decreasedExistingItemIndex];

        if (decreasedItem.amount === 1) {
          return {
            ...state,
            cart: updatedCart.filter(item => item.amount > 0),
            total: state.total - decreasedItem.price,
          };
        } else {
          const newTotal = state.total - decreasedItem.price;
          return {
            ...state,
            cart: updatedCart,
            total: newTotal >= 0 ? newTotal : 0,
          };
        }
      }
      return state;
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
        total: state.total - (state.cart.find(item => item.id === action.payload.id).price * state.cart.find(item => item.id === action.payload.id).amount),
      };

    case 'CLEAR':
      return {
        ...state,
        cart: [],
        total: 0,
      }
    default:
      return state;
  }
};


const fetchData = async (dispatch) => {
  dispatch({ type: 'FETCH_START' });

  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    dispatch({ type: 'FETCH_SUCCESS', payload: data });

  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error.message });
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation()
  const { setCartPopup } = useGlobalContext();

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleIncrease = (e, id) => {
    e.stopPropagation()
    dispatch({ type: 'INCREASE', payload: { id } });
  };

  const handleDecrease = (e, id) => {
    dispatch({ type: 'DECREASE', payload: { id } });
    e.stopPropagation()
  };

  const handleRemoveItem = (e, id) => {
    e.stopPropagation()
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR' });
    setCartPopup(false)
  };


  useEffect(() => {
    fetchData(dispatch);
  }, []);

  return (
    <>
      <AnimatePresence>
        <Header state={state}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          handleRemoveItem={handleRemoveItem}
          handleClearCart={handleClearCart} />
        <ScrollToTop />
        <Sidebar state={state}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          handleRemoveItem={handleRemoveItem}
          handleClearCart={handleClearCart} />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <>
              <Hero page='home' />
              <ProductsDisplay data={state.data} page='home' handleAddToCart={handleAddToCart} />
              <MensBanner page='home' />
              <ProductsCarousel data={state.data} categories={state.categories} page='home' />
              <WomensClothing data={state.data} page='home' handleAddToCart={handleAddToCart} />
            </>
          } />
          <Route path="/electronics" element={<Electronics page='electronics' data={state.data} handleAddToCart={handleAddToCart} />} />
          <Route path="/men's clothing" element={<MensClothing page='mens' data={state.data} handleAddToCart={handleAddToCart} />} />
          <Route path="/jewelery" element={<Jewelery page='jewelery' data={state.data} />} handleAddToCart={handleAddToCart} />
          <Route path="/women's clothing" element={<Womens page="women's" data={state.data} handleAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart page='cart' data={state.data} />} />
          < Route path="/payment" element={<Payment />} />
        </Routes>
      </AnimatePresence>
      <Footer state={state} />
    </>
  );
}

export default App;
