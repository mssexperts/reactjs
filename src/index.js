import React from 'react';
import { render } from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';

const app = document.querySelector('.app');

render(<Routes />, app);
