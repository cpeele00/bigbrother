import React from 'react';
import { render } from 'react-dom';
import App from './app';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

render(<App />, document.querySelector('#demo'))