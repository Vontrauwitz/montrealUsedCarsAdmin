import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
import Car from "../../lib/models/Cars";
import connectToMongoose from "../../lib/mongoose"; // Asegúrate de que la ruta es correcta

export default async function handler(req, res) {
    // Aseguramos que la conexión a la base de datos está establecida
    await connectToMongoose();

    const { method } = req;

  

  
    if (method === 'POST') {
      const { brand, model, version, odometer, year, vinNumber, price } = req.body;
      try {
        const carDoc = await Car.create({
          brand, model, version, odometer, year, vinNumber, price
        });
        res.status(201).json(carDoc);
      } catch (error) {
        console.error("Error creating car:", error);
        res.status(500).json({ message: "Error creating car", error: error.message });
      }
    } else if (method === 'GET') {
      try {
        if(req.query?.id){
            res.json(await Car.findOne({_id:req.query.id}))
        } else {
            const cars = await Car.find({});
            res.status(200).json(cars);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ message: "Error fetching cars", error: error.message });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
}
