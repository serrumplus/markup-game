// import React from 'react';
// import ReactDOM from 'react-dom';
// import './css/style.css';
import {isMobile} from './helpers';

const Sticky = require('sticky-js');
import {tns} from '../node_modules/tiny-slider/src/tiny-slider';

document.addEventListener('DOMContentLoaded', () => {

    !isMobile() ? new Sticky('[data-sticky]', {}) : '';

    tns({
        container: '.slider',
    });

    document.querySelector('.categories') && document.querySelector('.categories').addEventListener('click', function(e) {
        let target = e.target;
        
        while (target != this) {
            if(e.target.tagName === 'SPAN') {
                e.target.parentNode.classList.toggle('opened')
                return 
            }
            target = target.parentNode;
        }
    });

    document.querySelector('.logoMenu').classList.add('transition');

    document.querySelector('.mobileMenuButton') && document.querySelector('.mobileMenuButton').addEventListener('click', function(e) {
        this.parentNode.classList.toggle('active');
        document.querySelector('.mobileWrapper') && document.querySelector('.mobileWrapper').classList.toggle('fixed')
    });

    if( isMobile() && document.querySelector('.logoMenu')) {
        document.querySelector('.logoMenu').addEventListener('click', handleMenuClick);        
    } 
})


function handleMenuClick(e) {
    
    let target = e.target;
    
    while (target != this) {
        if(target.tagName === 'A') {
            document.querySelector('.mobileContainer').classList.remove('active');
            document.querySelector('.mobileWrapper') && document.querySelector('.mobileWrapper').classList.toggle('fixed')
            return 
        }
        target = target.parentNode;
    }
}


// ReactDOM.render(
// 	<div></div>,
// 	document.getElementById('app'),
// );
