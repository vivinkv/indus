'use strict';

module.exports={
    routes:[{
        method:'GET',
        path:'/response-pages/:status',
        handler:'custom.responseBasedPage',
        config:{
            auth:false,
            policies:[],
            middlewares:[]
        }
    }]
}