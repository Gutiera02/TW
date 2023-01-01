import { Aliment } from "../models/aliment-model.js"
import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";
const Reservation = sequelize.define('reservation', {
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: true,
            notEmpty: true,
        }
    },
},
    {
        include: [Aliment]
    });
export { Reservation };