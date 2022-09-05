'use strict';

module.exports = async ({strapi}) => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Read',
      uid: 'read',
      pluginName: 'strapi-plugin-csv-upload',
    },
  ];
  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
