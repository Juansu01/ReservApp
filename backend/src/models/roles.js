'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ usuarios }) {
      this.belongsTo(usuarios, { foreignKey: 'usuario_id', as: 'rol' })
    }
  }
  Roles.init({
    nombre: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'roles',
  });
  return Roles;
};