const express = require('express');

const cors = require('cors');

const app=express();
const port=process.env.PORT || 5000;
// Z8BLw7iig8wWIe8x


app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('SIMPLE CRUD IS RUNNING');
})

app.listen(port,()=>{
    console.log(`Simple Crud is running , ${port}`);
})



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ziamnoun05:Z8BLw7iig8wWIe8x@cluster0.tq05c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
