import React from 'react';
import ReactDom from 'react-dom';
import { Router } from './router';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);
ReactDom.render(<Router></Router>, root);