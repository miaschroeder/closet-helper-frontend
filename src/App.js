import React from 'react';
import { Button } from 'antd';
import './App.css';
import SuggestedClothesComponent from './components/suggestedClothesComponent/SuggestedClothesComponent';

const App = () => {
  return (
    <div className="App">
    <Button type="primary">Button</Button>
    <SuggestedClothesComponent />
  </div>
  )
};

export default App;
