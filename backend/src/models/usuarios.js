'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ordenes, roles }) {
      this.hasOne(
        ordenes,
        {
          foreignKey: 'usuario_id',
          onDelete: 'cascade',
          hooks: true,
          as: 'orden'
        }
      )
      this.hasOne(roles, {
        foreignKey: 'usuario_id',
        onDelete: 'cascade',
        hooks: true,
        as: 'rol'
      })
    }
  }
  Usuarios.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'usuarios',
    defaultScope: {
      attributes: {
        exclude: ['password']
      },
    },
    scopes: {
      withPassword: {
        attributes: {}
      }
    }
  });
  return Usuarios;
};