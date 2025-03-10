'use strict';

/**
 * A set of functions called "actions" for `custom`
 */

module.exports = {
 responseBasedPage: async (ctx, next) => {
    try {
      const {status}=ctx.params;
      const page=await strapi.documents('api::response-page.response-page').findFirst({
        filters:{
          Status_Code:{
            $containsi:status
          }
        },
        populate:'*'
      })

      if(!page){
        ctx.status=404;
        ctx.body="Page Not Found";
        return
      }
      ctx.status=200;
      ctx.body ={
        data:page
      };
    } catch (err) {
      ctx.status = 500;
      ctx.body = err;
    }
  }
};
