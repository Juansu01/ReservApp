'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ordenes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      nombres: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      apellidos: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      tipo_de_documento: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      identificacion: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      fecha_de_reserva: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tipo_de_reserva: {
        type: Sequelize.STRING(100)
      },
      descripcion_observaciones: {
        type: Sequelize.STRING(300)
      },
      usuario_id: {
        type: Sequelize.STRING(100),
      },
      confirmada: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ordenes');
  }
};