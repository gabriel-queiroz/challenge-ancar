'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      questionnaire_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('questions', {
      type: 'foreign key',
      name: 'fk_questions_questionnaire',
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
      'questions',
      'fk_questions_questionnaire',
    );
    queryInterface.dropTable('questions');
  },
};
