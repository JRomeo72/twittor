
function updateDynamicCache ( dynamicCache, req, res ) {

    if( res.ok ) {

        if(req.url.indexOf('chrome-extension') === -1) {
            return caches.open( dynamicCache ).then( cache => {
                cache.put( req, res.clone() )
                    // .catch(err => {
                    //     console.log("Req:", req);
                    //     console.log("Res:", res.clone());
                    //     console.log(err.message)
                    // });
                return res.clone()
            } )
        } else {
            console.log("caching: ", req.url);
            return res
        }

    } else {
        return res
    }
}