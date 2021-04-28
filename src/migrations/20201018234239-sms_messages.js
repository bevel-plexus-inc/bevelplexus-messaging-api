module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable("sms_messages", {
        id: {
            type:          Sequelize.UUID,
            primaryKey:    true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        from_number: {
            type:      Sequelize.STRING,
            allowNull: false,
        },
        phone_number: {
            type:      Sequelize.STRING,
            allowNull: false,
        },
        body: {
            type:      Sequelize.TEXT,
            allowNull: false,
        },
        status: {
            type:      Sequelize.STRING,
            allowNull: false,
        },
        twilio_sid: {
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

    down: queryInterface => queryInterface.dropTable("sms_messages"),
};
