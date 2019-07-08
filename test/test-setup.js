require('babel-register')();
require('jsdom-global/register');
require('babel-polyfill');

const divApp = global.document.createElement('div');

divApp.className = 'app';

global.document.body.appendChild(divApp);
