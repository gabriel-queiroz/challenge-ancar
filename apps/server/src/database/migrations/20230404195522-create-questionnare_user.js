'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questionnaire_user', {
      user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        reference: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      questionnaire_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        reference: {
          model: 'questionnaires',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('questionnaire_user', {
      type: 'foreign key',
      name: 'fk_questionnaire_user',
      fields: ['user_id'],
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('questionnaire_user', {
      type: 'foreign key',
      name: 'fk_user_questionnaire',
      fields: ['questionnaire_id'],
      references: {
        table: 'questionnaires',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'questionnaire_user',
      'fk_questionnaire_user',
    );
    await queryInterface.removeConstraint(
      'questionnaire_user',
      'fk_user_questionnaire',
    );
    return queryInterface.dropTable('questionnaire_user');
  },
};
