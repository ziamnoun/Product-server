// const express = require('express');

// const cors = require('cors');

// const app=express();
// const port=process.env.PORT || 5000;
// // Z8BLw7iig8wWIe8x


// app.use(cors());
// app.use(express.json());
// app.get('/',(req,res)=>{
//     res.send('SIMPLE CRUD IS RUNNING');
// })

// app.listen(port,()=>{
//     console.log(`Simple Crud is running , ${port}`);
// })



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://ziamnoun05:Z8BLw7iig8wWIe8x@cluster0.tq05c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }

//   const ProductCollection = client.db('Product').collection('Product');

//   app.get('/product', async (req, res) => {
//     try {
//         const cursor = ProductCollection.find();
//         const result = await cursor.toArray();
//         res.send(result);
//     } catch (error) {
//         res.status(500).send({ message: 'Failed to fetch req', error });
//     }
// });



// }
// run().catch(console.dir);


const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('SIMPLE CRUD IS RUNNING');
});

app.listen(port, () => {
    console.log(`Simple Crud is running on port ${port}`);
});

const uri = "mongodb+srv://ziamnoun05:Z8BLw7iig8wWIe8x@cluster0.tq05c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const ProductCollection = client.db('Product').collection('Product');

        app.get('/product', async (req, res) => {
            try {
                const { page = 1, limit = 10 } = req.query;
                const skip = (page - 1) * limit;
                const products = await ProductCollection.find().skip(parseInt(skip)).limit(parseInt(limit)).toArray();
                const totalProducts = await ProductCollection.countDocuments();
                res.send({ products, totalProducts });
            } catch (error) {
                res.status(500).send({ message: 'Failed to fetch products', error });
            }
        });

    } finally {
        // Uncomment the following line if you want to close the client after every request (not recommended in a production setting)
        // await client.close();
    }
}
run().catch(console.dir);

