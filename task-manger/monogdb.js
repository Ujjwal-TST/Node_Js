const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

async function run() {



    try {
        await client.connect();
        // database and collection code goes here
        // find code goes here
        // iterate code goes here

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");


        // Connect with your DB
        const myDb = client.db('myDb');
        // Connect with your Collection 
        const collection = myDb.collection('test')


        // ----------------> Single Record  Insert Operation <---------------->
        // const insertManyresult = await collection.insertOne({
        //     name: 'Testing Patel',
        //     age: 20,
        // })
        // console.log(` documents were inserted.`);


        // ----------------> Mulitple Record  Insert Operation <----------------
        // const insertManyresult = await collection.insertMany([
        //     {
        //         name: 'Patel',
        //         age: 20,
        //     },
        //     {
        //         name: 'Smital Patel',
        //         age: 24,
        //     },
        //     {
        //         name: 'Testing',
        //         age: 27,
        //     },
        // ])
        // console.log(` documents were inserted.`);

        //  ----------------> Read Operation <----------------
        // const cursor = collection.find();
        // const cursor = collection.find({ age: 21 });
        // await cursor.forEach(console.log)

        // ----------------> Find of Retrive Data using the Query <----------------
        // const cursor = await collection.findOne({ _id: new ObjectId('6526324b7e06f9946b79236f') })
        // const cursor = await collection.findOne({ age: 24 })
        // const cursor = await collection.findOne({ name: 'Testing' })
        // console.log(cursor);


        //  ----------------> Update Operation <----------------

        // Update One
        // const cursor = await collection.updateOne({
        //     _id: new ObjectId('65278e7e9d85f90cb8c7a1f0')
        // }, {
        //     $set: {
        //         age: 22
        //     }
        // })

        // Update Many
        // const cursor = await collection.updateMany({
        //     age: { $gt: 25 }
        // }, {
        //     $set: {
        //         age: 30
        //     }
        // })
        // console.log(cursor);


        //  ----------------> Delete Operation <----------------

        // Delete One
        // const cursor = await collection.deleteOne({
        //     age: 20
        // })

        // Delete Many
        const cursor = await collection.deleteMany({
            age: 30
        })
        console.log(cursor);


    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

}
run().catch(console.dir);
