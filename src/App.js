import React from 'react';
import { Button } from 'antd';
import './App.css';
// import SuggestedClothesComponent from './components/suggestedClothesComponent/SuggestedClothesComponent';
import HomePageView from './pages/home-page/home-page-view';

const App = () => {
  return (
    <div className="App">
      {/* <SuggestedClothesComponent /> */}
      <HomePageView />
    </div>
  )
};

export default App;
