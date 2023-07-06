import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./bootstrap.min.css"
import store from "./store";

store.subscribe(() => console.log(store.getState()));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
