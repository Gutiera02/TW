
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./sequelize.js";
//import { mainRouter } from "./Routes/mainRouter.js";
import { User } from "./models/user-model.js";
import { Aliment } from "./models/aliment-model.js"
import { Reservation } from "./models/reservation-model.js"
import { Friend } from "./models/friend-model.js"
User.hasMany(Aliment);
Aliment.belongsTo(User);

User.hasMany(Reservation);
Reservation.belongsTo(User);

User.hasMany(Friend);
Friend.belongsTo(User);

Reservation.hasMany(Aliment);
Aliment.belongsTo(Reservation);
const app = express();
app.use(cors());
app.use(bodyParser.json());
import { userRouter } from "./routers/user-router.js";
import { userFoodItemRouter } from "./routers/userFoodItem-router.js";
import { FoodItemsRouter } from "./routers/FoodItems-router.js";
import { reservationRouter } from "./routers/reservation-router.js";
//import { loginRouter } from "./routers/loginUser-router.js";
import { friendRouter } from "./routers/friend-router.js";
//import { CREATED, INTERNAL_SERVER_ERROR } from "http-status";

app.get("/create", async (req, res, next) => {
    try {
        res.status(200).json({ message: "Created" });
    } catch (error) {
        next(error);
    }
});

app.use("/api/users", userRouter);
app.use("/api/users", userFoodItemRouter);
app.use("/api/FoodItems", FoodItemsRouter);
app.use("/api/users", reservationRouter);
// app.use("/api/users", loginRouter);
app.use("/api/users", friendRouter);

app.use((error, req, res, next) => {
    console.warn(error);
    res.status(404).json({ message: "Server error" });
});

app.listen(5462, async () => {
    console.log("Express web server running on port 5001");
    try {
        await sequelize.authenticate();
        console.log("Connection has been established!");
    } catch (err) {
        console.err("Unable to connect to the database!", err);
    }
});