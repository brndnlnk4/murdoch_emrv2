let token, axios;

try {
//  window.$ = jQuery = require('jquery');
//  window._ = lodash = require('lodash');
//  window.axios = require('axios');
//  window.moment = require('moment');
require('jqueryui');

//  require('bootstrap-sass');

//  token = document.head.querySelector('meta[name="csrf-token"]');
} catch (e) {
  console.info('ohh crap yo, error loading dependency in laravel mix\'s bootstrap.js:',e)
}

//axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

//if (token) {
//    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
//} else {
//    console.error('!YO CSRF token is MISSING: https://laravel.com/docs/csrf#csrf-x-csrf-token');
//}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
