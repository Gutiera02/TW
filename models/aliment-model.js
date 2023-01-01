import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";

const Aliment = sequelize.define("aliment", {
    id: {
        type: DataTypes.UUID, // preffered type for IDs
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull:
            {
                message: 'Please write your product!'
            },
            len: [3, 200],
        }
    },
    category:
    {
        type: DataTypes.ENUM,
        allowNull: true,
        values: ['Vegetables', 'Fruits', 'Meat', 'Fish', 'Dairy']
    },
    expirationDate:
    {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate:
        {
            isDate: true,
            notEmpty: true,
            notNull:
            {
                message: 'Please write the product\'s expiration date!'
            }
        }
    },
    ingredients:
    {
        type: DataTypes.STRING,
        allowNull: true
    },
    weight:
    {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate:
        {
            min: 0
        }

    },
    status:
    {
        type: DataTypes.ENUM,
        allowNull: true,
        values: ['AVAILABLE', 'RESERVED'],
        defaultValue: 'AVAILABLE'

    }

});

export { Aliment };