'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ordenes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ usuarios }) {
      this.belongsTo(usuarios, { foreignKey: 'usuario_id' })
    }
  }
  Ordenes.init({
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    tipo_de_documento: DataTypes.STRING,
    identificacion: DataTypes.STRING,
    email: DataTypes.STRING,
    fecha_de_reserva: DataTypes.DATE,
    tipo_de_reserva: DataTypes.STRING,
    descripcion_observaciones: DataTypes.STRING,
    usuario_id: DataTypes.STRING,
    confirmada: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'ordenes',
  });
  return Ordenes;
};