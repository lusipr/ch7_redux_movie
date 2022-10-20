import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/antd.css';
import 'swiper/css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import reportWebVitals from './reportWebVitals';
import { Details } from './pages/Details';
import Search from './pages/Search';
import { Genre } from './pages/Genre';
import { Movies } from './pages/Movies';
import { ParentProvider } from './utils/context';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ParentProvider>
      <GoogleOAuthProvider clientId="709774975189-uuqlsauh74522qlp6bv3rea985ce16np.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Details />} />
            <Route path="/search/:id" element={<Search />} />
            <Route path="/genre/:id" element={<Genre />} />
            <Route path="/movie" element={<Movies />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ParentProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
