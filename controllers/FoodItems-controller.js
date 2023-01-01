import { Aliment } from "../models/aliment-model.js"




const getFoodItems = async (req, res) => {
    try {
        const aliments = await Aliment.findAll();
        res.status(200).json(aliments);
    } catch (error) {
        console.warn(error);
    }
}



const createFoodItems = async (req, res) => {
    try {
        if (req.body.name && req.body.expirationDate) {
            const newData = await Aliment.create(req.body);
            res.status(200).json(newData);
        } else {
            res.status(404).json({ message: "Complete the name and expiration date fields" })
        }
    } catch (error) {
        console.warn(error);
    }
}

const getFoodItem = async (req, res) => {
    try {
        const alimentId = req.params.aid;
        if (isNaN(alimentId)) {
            res.status(404).json({ message: 'Aliment id is not a number' });
        } else {
            const resultAliment = await Aliment.findByPk(alimentId);
            if (resultAliment) {
                res.status(200).json(resultAliment);
            } else {
                res.status(404).json({ message: 'Sorry! The aliment was not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const updateFoodItems = async (req, res) => {
    try {
        const alimentId = req.params.aid;
        if (isNaN(alimentId)) {
            res.status(404).json({ message: 'Aliment id is not a number' });
        } else {
            const foundAliment = await Aliment.findByPk(alimentId);
            if (foundAliment) {
                if (req.body.name && req.body.expirationDate) {
                    foundAliment.name = req.body.name;
                    foundAliment.category = req.body.category;
                    foundAliment.expirationDate = req.body.expirationDate;
                    foundAliment.ingredients = req.body.ingredients;
                    foundAliment.weight = req.body.weight;
                    foundAliment.status = req.body.status;
                    await foundAliment.save();
                    res.status(httpStatus.OK).json(foundAliment);
                } else {
                    res.status(404).json({ message: "Complete the name and expiration date fields" })
                }
            } else {
                res.status(404).json({ message: 'Sorry! The aliment was not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

const deleteFoodItems = async (req, res) => {
    try {
        const alimentId = req.params.aid;
        if (isNaN(alimentId)) {
            res.status(404).json({ message: 'Aliment id should be a number' });
        } else {
            const foundAliment = await Aliment.findByPk(alimentId);
            if (foundAliment) {
                await foundAliment.destroy();
                res.status(404).json({ message: 'Sorry! There was no content found' });
            } else {
                res.status(404).json({ message: 'Sorry! The aliment was not found' });
            }
        }
    } catch (error) {
        console.warn(error);
    }
}

export { getFoodItems, createFoodItems, getFoodItem, updateFoodItems, deleteFoodItems };