import { User } from "../models/user-model.js";
import { Aliment } from "../models/aliment-model.js"




const getUserFoodItems = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(404).json({ message: 'User id is not a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const aliments = await user.getAliments();
                res.status(200).json(aliments);
            } else {
                res.status(404).json({ message: 'The user doesn\'t exist' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const createUserFoodItems = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(404).json({ message: 'User id is not a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const aliment = await Aliment.create(req.body);
                aliment.userId = user.id;
                await aliment.save();
                res.status(200).json(aliment);
            } else {
                res.status(404).json({ message: 'The user doesn\'t exist' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const getUserFoodItem = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(404).json({ message: 'User id is not a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const aliments = await user.getAliments({ where: { id: req.params.aid } });
                const aliment = aliments.shift();
                if (aliment) {
                    res.status(200).json(aliment);
                } else {
                    res.status(404).json({ message: 'The aliment doesn\'t exist' });
                }
            } else {
                res.status(404).json({ message: 'The user doesn\'t exist' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const updateUserFoodItems = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(404).json({ message: 'User is not a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const aliment = await Aliment.findByPk(req.params.aid);
                if (aliment) {
                    aliment.id = req.body.id;
                    aliment.name = req.body.name;
                    aliment.category = req.body.category;
                    aliment.expirationDate = req.body.expirationDate;
                    aliment.ingredients = req.body.ingredients;
                    aliment.weight = req.body.weight;
                    aliment.status = req.body.status;
                    aliment.reservationId = req.body.reservationId;
                    await aliment.save();
                    res.status(200).json(aliment);
                } else {
                    res.status(404).json({ message: 'The aliment doesn\'t exist' });
                }
            } else {
                res.status(404).json({ message: 'The user doesn\'t exist' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const deleteUserFoodItems = async (req, res) => {
    try {
        const userId = parseInt(req.params.uid);
        if (isNaN(userId)) {
            res.status(404).json({ message: 'User id is not a number' });
        } else {
            const user = await User.findByPk(userId);
            if (user) {
                const aliments = await user.getAliments({ where: { id: req.params.aid } });
                const aliment = aliments.shift();
                console.log("aliment", aliment)
                if (aliment) {
                    await aliment.destroy();
                    res.status(404).json({ message: 'Inexistent content' });
                } else {
                    res.status(404).json({ message: 'The aliment doesn\'t exist' });
                }
            } else {
                res.status(404).json({ message: 'The user doesn\'t exist' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}
export { deleteUserFoodItems, updateUserFoodItems, getUserFoodItem, getUserFoodItems, createUserFoodItems };
