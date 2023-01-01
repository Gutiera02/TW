
//const { User, Reservation, Aliment } = require("../sequelize-config");
import { User } from "../models/user-model.js";
import { Aliment } from "../models/aliment-model.js"
import { Reservation } from "../models/reservation-model.js"




const getReservations = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(404).json({ message: 'User id is not a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const reservations = await user.getReservations({
                    include: [Aliment]
                });
                res.status(200).json(reservations);
            } else {
                res.status(404).json({ message: 'The user was not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const getReservation = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(404).json({ message: 'User id is not a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const reservations = await user.getReservations({ where: { id: req.params.rid } });
                const reservation = reservations.shift();
                if (reservation) {
                    res.status(200).json(reservation);
                } else {
                    res.status(404).json({ message: 'The reservation doesn\'t exist' });
                }
            } else {
                res.status(404).json({ message: 'The user doesn\'t exist' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const createReservation = async (req, res) => {
    try {
        const userId = req.params.uid;
        if (isNaN(userId)) {
            res.status(404).json({ message: 'User id is not a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const { FoodItemsIds } = req.body;
                if (FoodItemsIds) {
                    const newReservation = await Reservation.create(req.body);
                    newReservation.userId = user.id;

                    for (let i = 0; i < FoodItemsIds.length; i++) {
                        const foundAliment = await Aliment.findByPk(FoodItemsIds[i]);
                        newReservation.addAliment(foundAliment);
                    }
                    await newReservation.save();
                    res.status(200).json(newReservation);
                } else {
                    res.status(404).json({ message: 'At least one aliment have to be selected for reservation' });
                }
            } else {
                res.status(404).json({ message: 'The user doesn\'t exist' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const deleteReservation = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(404).json({ message: 'User id is not a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const reservations = await user.getReservations({ where: { id: req.params.rid } });
                const reservation = reservations.shift();
                if (reservation) {
                    const FoodItems = await Aliment.findAll({
                        where: {
                            reservationId: reservation.id
                        }
                    });
                    let newFoodItems = FoodItems;
                    for (let aliment of newFoodItems) {
                        aliment.status = 'AVAILABLE';
                        await aliment.save();
                    }
                    await reservation.destroy();
                    res.status(404).json('Inexistent content');
                } else {
                    res.status(404).json({ message: 'The reservation doesn\'t exist' });
                }
            } else {
                res.status(404).json({ message: 'The user doesn\'t exist' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}
export { deleteReservation, getReservation, getReservations, createReservation };