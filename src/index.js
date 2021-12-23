import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

import BlogHomePage from './pages/Home';
import ABlogPost from './pages/HowToTermux';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="home" element={<BlogHomePage />} />
      <Route path="termux" element={<ABlogPost />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

