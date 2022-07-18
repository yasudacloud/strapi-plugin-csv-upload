'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-plugin-csv-upload')
      .service('myService')
      .getWelcomeMessage();
  },
};
