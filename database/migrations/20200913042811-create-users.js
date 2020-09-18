// "use strict";

// module.exports = {
//   up:async (queryInterface, DataTypes) => {
//     return await queryInterface.createTable("users", {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataTypes.INTEGER,
//       },
//       name: {
//         allowNull: false,
//         type: DataTypes.STRING,
//       },
//       email: {
//         type: DataTypes.STRING,
//         unique: {
//           name: 'users_email',
//           msg: 'Email de usuário já cadastrado',
//         },
//         validate: {
//           notEmpty: true,
//           isEmail: true,
//         },
//       },
//       pwd: {
//         allowNull: false,
//         type: DataTypes.STRING,
//       },
//       isActive: {
//         type: DataTypes.INTEGER,
//         defaultValue: 1,
//         values: [0, 1],
//       },
//       createdAt: {
//         allowNull: false,
//         type: DataTypes.DATE,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: DataTypes.DATE,
//       },
//     });
//   },

//   down:async (queryInterface) => {
//     return await queryInterface.dropTable("users");
//   },
// };

"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("users", {
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
      email: {
        type: DataTypes.STRING,
        unique: {
          name: 'users_email',
          msg: 'Email de usuário já cadastrado',
        },
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      pwd: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        values: [0, 1],
      },
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
    return queryInterface.dropTable("users");
  },
};
