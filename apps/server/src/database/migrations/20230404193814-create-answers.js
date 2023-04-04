'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('answers', {
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
    await queryInterface.addConstraint('answers', {
      type: 'foreign key',
      name: 'fk_answer_questionnaire',
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
    await queryInterface.removeConstraint('answers', 'fk_answer_questionnaire');
    queryInterface.dropTable('answers');
  },
};
