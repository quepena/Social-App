import mongoose from "mongoose";

const connectDummyDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DUMMY_MONGO_URI, {
            useUnifiedTopology: true,
        })

        console.log(`Test Mongo is connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDummyDB