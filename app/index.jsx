import './main.css';

import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/App.jsx';
import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';


const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);

persist(alt, storage, 'app');

root.render(<App />);
