import Car from "../../lib/models/Cars";
import connectToMongoose from "../../lib/mongoose";

export default async function handler(req, res) {
    await connectToMongoose();

    const { method } = req;

    if (method === 'POST') {
        const { brand, model, version, odometer, year, vinNumber, price } = req.body;
        try {
            const carDoc = await Car.create({ brand, model, version, odometer, year, vinNumber, price });
            res.status(201).json(carDoc);
        } catch (error) {
            console.error("Error creating car:", error);
            res.status(500).json({ message: "Error creating car", error: error.message });
        }
    } else if (method === 'GET') {
        try {
            if (req.query?.id) {
                const car = await Car.findById(req.query.id);
                if (!car) {
                    return res.status(404).json({ message: "Car not found" });
                }
                res.json(car);
            } else {
                const cars = await Car.find({});
                res.status(200).json(cars);
            }
        } catch (error) {
            console.error("Error fetching cars:", error);
            res.status(500).json({ message: "Error fetching cars", error: error.message });
        }
    } else if (method === 'PUT') {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: "No ID provided" });
        }
        const { brand, model, version, odometer, year, vinNumber, price } = req.body;
        try {
            const carDoc = await Car.findByIdAndUpdate(id, { brand, model, version, odometer, year, vinNumber, price }, { new: true, runValidators: true });
            if (!carDoc) {
                return res.status(404).json({ message: "Car not found" });
            }
            res.status(200).json(carDoc);
        } catch (error) {
            console.error("Error updating car:", error);
            res.status(500).json({ message: "Error updating car", error: error.message });
        }
    } else if (method === 'DELETE') {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: "No ID provided" });
        }
        try {
            const carDoc = await Car.findByIdAndDelete(id);
            if (!carDoc) {
                return res.status(404).json({ message: "Car not found" });
            }
            res.status(200).json({ message: "Car deleted successfully" });
        } catch (error) {
            console.error("Error deleting car:", error);
            res.status(500).json({ message: "Error deleting car", error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}