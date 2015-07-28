// Install polyfills
require('babel/polyfill');

// Our app needs CSS, add it to the dependency tree.
require('sass/app.scss');

// GSAP doesn't play well with modules. Load globally.
require('gsap');
require('gsap/src/uncompressed/plugins/ColorPropsPlugin');

import Core from 'app/Core';
import Scene from 'app/Scene';

window.core = new Core();
window.core.attach(document.getElementById('container'));

window.currentScene = new Scene(window.core);

window.core.start();
