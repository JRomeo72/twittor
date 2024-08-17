importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [

    // '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'
];

// fetch('https://fonts.googleapis.com/css?family=Quicksand:300,400')
//     .then(res => res.text()).then(console.log)

const APP_SHELL_INMUTABLE = [
    // 'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    // 'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

// Install
self.addEventListener('install', e => {

    let = cacheStatic = caches.open( STATIC_CACHE )
        .then( cache => cache.addAll( APP_SHELL ) );
    
    let = cacheInmutable = caches.open( INMUTABLE_CACHE )
        .then( cache => cache.addAll( APP_SHELL_INMUTABLE ) );

    e.waitUntil(Promise.all( [ cacheStatic, cacheInmutable ] ))
});

// Activate
self.addEventListener('activate', e => {

    let res = caches.keys().then( keys => {
        keys.map( key => {
            if( key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key)
            }
        } )
    } );

    e.waitUntil(res)

});

//Fech
self.addEventListener('fetch', e => {

    let res = caches.match( e.request ).then( res => {
        if( res ) {
            return res
        } else {
            return fetch( e.request )
                .then( newRes => {
                    return updateDynamicCache( DYNAMIC_CACHE, e.request, newRes )
                })
        }
    })

    e.respondWith( res )
})