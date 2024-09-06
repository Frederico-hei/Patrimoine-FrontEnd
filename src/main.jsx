import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import AddPossessionForm from './add';
import Menu from './menu';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<AddPossessionForm />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
