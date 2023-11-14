import { useEffect, useReducer, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
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

const initialState = {
  loading: false,
  data: null,
  categories: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      const uniqueCategories = Array.from(new Set(action.payload.map((product) => product.category)));
      return { ...state, loading: false, data: action.payload, categories: uniqueCategories, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, data: null, categories: [], error: action.payload };
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

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  return (
    <>
      <Header state={state} />
      <ScrollToTop />
      <Sidebar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <ProductsDisplay data={state.data} />
            <MensBanner />
            <ProductsCarousel data={state.data} categories={state.categories} />
            <WomensClothing data={state.data} />
          </>
        } />
        <Route path="/electronics" element={<Electronics data={state.data} />} />
        <Route path="/mens-clothing" element={<MensClothing data={state.data} />} />
        <Route path="/jewelery" element={<Jewelery data={state.data} />} />
      </Routes>
      <Footer state={state} />
    </>
  );
}

export default App;
