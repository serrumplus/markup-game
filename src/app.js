// import React from 'react';
// import ReactDOM from 'react-dom';
import './css/style.css';

const Sticky = require('sticky-js');
import {tns} from '../node_modules/tiny-slider/src/tiny-slider';



const sticky = new Sticky('[data-sticky]', {});

// sticky.update();


tns({
    container: '.slider',
})



// ReactDOM.render(
// 	<div></div>,
// 	document.getElementById('app'),
// );
