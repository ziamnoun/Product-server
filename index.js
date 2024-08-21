const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

//https://66c5dab08c736e188ea6665f--venerable-concha-4336cc.netlify.app/

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin:[
        'http://localhost:5173','https://66c5dab08c736e188ea6665f--venerable-concha-4336cc.netlify.app'
    ]
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('SIMPLE CRUD IS RUNNING');
});

// MongoDB URI from environment variables
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.tq05c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const ProductCollection = client.db('Product').collection('Product');

        app.get('/product', async (req, res) => {
            try {
                const { page = 1, limit = 10, sort = '', search = '' } = req.query;
                const skip = (page - 1) * limit;
                const query = search ? { name: { $regex: search, $options: 'i' } } : {};
                let sortCriteria = {};

                if (sort === 'priceLowToHigh') {
                    sortCriteria = { price: 1 };
                } else if (sort === 'priceHighToLow') {
                    sortCriteria = { price: -1 };
                } else if (sort === 'dateNewestFirst') {
                    sortCriteria = { dateAdded: -1 };
                }

                const cursor = ProductCollection.find(query).sort(sortCriteria).skip(parseInt(skip)).limit(parseInt(limit));
                const products = await cursor.toArray();
                const totalProducts = await ProductCollection.countDocuments(query);
                res.send({ products, totalProducts });
            } catch (error) {
                res.status(500).send({ message: 'Failed to fetch products', error });
            }
        });

    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    } finally {
        // Ensure the client will close when you finish/error
        // Uncomment the following line if you want to close the connection after running
        // await client.close(); 
    }
}

run().catch(console.error);

app.listen(port, () => {
    console.log(`Simple CRUD is running on port ${port}`);
});
