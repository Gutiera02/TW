import express from "express";
import * as reservationController from '../controllers/reservation-controller.js';
const router = express.Router();

router.get('/:uid/reservations/', reservationController.getReservations);
router.get('/:uid/reservations/:rid', reservationController.getReservation);
router.post('/:uid/reservations/', reservationController.createReservation);
router.delete('/:uid/reservations/:rid', reservationController.deleteReservation);

export { router as reservationRouter };