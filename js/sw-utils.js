
function updateDynamicCache ( dynamicCache, req, res ) {

    if( res.ok ) {
        return caches.open( dynamicCache ).then( cache => {
            cache.put( req, res.clone() )
                .catch(err => console.log(err.message));
            return res.clone()
        } )
    } else {
        return res
    }
}