const { MongoClient } = require("mongodb");
const uri = 'mongodb://localhost:27017/';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    
    console.log(await client.db().admin().listDatabases());
    
    await client.db("eval-db").listCollections().toArray((err, collections) => {
          if (err) {
            return console.error("Error::", err.message);
          }
          collections.forEach(col => {
            console.info("COLLECTION: ", col.name);
          });
        });
    
    const database = client.db('eval-db');
    const movies = database.collection('looping');
    const query = { };
    const movie = await movies.findOne(query);
    console.log(movie);
  } 
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run();//.catch(console.dir);