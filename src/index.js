import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import HomePageView from './pages/home-page/home-page-view';
import ClosetPageView from './pages/closet-page/closet-page-view';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<HomePageView />} />
        <Route path ="/closet" element={<ClosetPageView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

