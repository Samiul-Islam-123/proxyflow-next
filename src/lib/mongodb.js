// lib/mongodb.js

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = { useUnifiedTopology: true, useNewUrlParser: true };

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Add the connectToDatabase function
export async function connectToDatabase() {
  if (!clientPromise) {
    throw new Error('MongoDB client is not connected');
  }
  const client = await clientPromise;
  return client.db(); // Returns the database instance
}

export default clientPromise;
