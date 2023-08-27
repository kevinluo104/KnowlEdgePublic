const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

(async () => {
  try {
    const mongoDBURL = process.env.REACT_APP_MONGO_DB_URL;
    const url = `mongodb+srv://${mongoDBURL}@knowledge.awzzm9g.mongodb.net/KnowlEdge?retryWrites=true&w=majority`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // const db = mongoose.connection.db;

    // const collections = await db.listCollections().toArray();

    // console.log('Collections:');
    // collections.forEach((collection) => {
    //   console.log(collection.name);
    // });
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
})();
