// import { model, Schema } from "mongoose";

// const CarSchema = new Schema({
//   brand: {
//     type: String,
//     // required: true,
//     // trim: true,
//     // minlength: 2, // Minimum brand length (adjust as needed)
//     // maxlength: 50, // Maximum brand length (adjust as needed)
//   },
//   model: {
//     type: String,
//     // required: true,
//     // trim: true,
//     // minlength: 2, // Minimum model length (adjust as needed)
//     // maxlength: 50, // Maximum model length (adjust as needed)
//   },
//   version: {
//     type: String,
//     // trim: true,
//     // maxlength: 50, // Maximum version length (adjust as needed)
//   },
//   odometer: {
//     type: Number,
//     // required: true,
//     // min: 0, // Minimum odometer value (cannot be negative)
//   },
//   year: {
//     type: Number,
//     // required: true,
//     // min: 1900, // Minimum valid year for cars
//     // max: new Date().getFullYear() + 1, // Maximum year is current year + 1 (future models)
//   },
//   vinNumber: {
//     type: String,
//     // required: true,
//     // unique: true, // Ensures no duplicate VIN numbers
//     // uppercase: true, // Convert to uppercase for consistent formatting
//     // match: /^[A-HJ-NPR-Z0-9]{17}$/, // Regular expression for VIN format validation (adjust as needed)
//   },
//   price: {
//     type: Number,
//     // required: true,
//     // min: 0, // Minimum price (cannot be negative)
//   },
// });

// const Car = model('Car', CarSchema);

// export default Car;

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  version: { type: String, required: true },
  odometer: { type: Number, required: true },
  year: { type: Number, required: true },
  vinNumber: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  photos: { type: [String], required: false }
}, {
  timestamps: true
});

// Cambia aquí: Revisa si el modelo ya está definido para evitar sobreescritura
const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

module.exports = Car;
