module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable("email_messages", {
        id: {
            type:          Sequelize.UUID,
            primaryKey:    true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        from_email: {
            type:      Sequelize.STRING,
            allowNull: false,
        },
        parameters: {
            type:      Sequelize.TEXT,
            allowNull: false,
        },
        template_id: {
            type:      Sequelize.INTEGER,
            allowNull: false,
        },
        status: {
            type:      Sequelize.STRING,
            allowNull: false,
        },
        email_type: {
            type:      Sequelize.STRING,
            allowNull: false,
        },
        sib_message_id: {
            type:      Sequelize.STRING,
            allowNull: true,
        },
        created_at: {
            allowNull:    false,
            type:         Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updated_at: {
            allowNull:    false,
            type:         Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    }),

    down: queryInterface => queryInterface.dropTable("email_messages"),
};
