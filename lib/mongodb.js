// Este enfoque se toma de https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // En modo desarrollo, usa una variable global para que el valor
  // se preserve a través de recargas de módulos causadas por HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En modo producción, es mejor no usar una variable global.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Exporta una promesa de MongoClient con alcance de módulo. Al hacer esto en un
// módulo separado, el cliente se puede compartir entre funciones.
export default clientPromise;
