//todo atualizar imagens
"use strict";

// var User = this.sequelize.define('user', {/* attributes */})
// , Company  = this.sequelize.define('company', {/* attributes */});

// User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'}); // Adds fk_companyname to User
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,  
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      category: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "productCategories", key: "id" },
      },
      provider: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "productProviders", key: "id" },
      },
      createdBy: {
        allowNull: false, 
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      price: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      brand: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imgA: { allowNull: true, type: DataTypes.STRING },
      imgB: { allowNull: true, type: DataTypes.STRING },
      imgC: { allowNull: true, type: DataTypes.STRING },
      imgD: { allowNull: true, type: DataTypes.STRING },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("products");
  },
};
