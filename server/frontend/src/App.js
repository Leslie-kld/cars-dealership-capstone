import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Dealers from './components/Dealers/Dealers';
import Dealer from './components/Dealer/Dealer';
import PostReview from './components/PostReview/PostReview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dealers />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dealer/:id" element={<Dealer />} />
        <Route path="/postreview/:id" element={<PostReview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;