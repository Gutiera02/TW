import { Sequelize } from "sequelize";
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./sqlite/database.db",
});
sequelize.sync({ alter: true }).then(() => {
    console.log("All the models have been synchronized");
});
// import { User } from "./models/user-model.js";
// import { Aliment } from "./models/aliment-model.js"
// import { Reservation } from "./models/reservation-model.js"
// import { Friend } from "./models/friend-model.js"

// User.hasMany(Aliment);
// Aliment.belongsTo(User);

// User.hasMany(Reservation);
// Reservation.belongsTo(User);

// User.hasMany(Friend);
// Friend.belongsTo(User);

// Reservation.hasMany(Aliment);
// Aliment.belongsTo(Reservation);

export { sequelize };
// export { User };
// export { Aliment };
// export { Friend };
// export { Reservation };