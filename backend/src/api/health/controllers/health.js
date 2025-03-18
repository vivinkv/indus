'use strict';

/**
 * A set of functions called "actions" for `health`
 */

module.exports = {
  healthCheck: async (ctx, next) => {
    try {
      ctx.status = 200;
      ctx.body = {
        msg: 'Healthy'
      };
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        msg: 'Unhealthy'
      };
    }
  }
};
