'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn("Users", "access_token", {
        type: Sequelize.STRING(1000),
      });
      await queryInterface.changeColumn("Users", "refresh_token", {
        type: Sequelize.STRING(1000),
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn("Users", "access_token", {
        type: Sequelize.STRING,
      });
      await queryInterface.changeColumn("Users", "refresh_token", {
        type: Sequelize.STRING,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
