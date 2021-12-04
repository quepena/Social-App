import connectDB from './config/db.js';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import countryRoutes from './routes/countryRoutes.js'
import cityRoutes from './routes/cityRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import conversationRoutes from './routes/conversationRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import connectDummyDB from './config/testdb.js';

dotenv.config();

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'testdb') {
    connectDummyDB();
}
// if (process.env.NODE_ENV == 'db') {
if (process.env.NODE_ENV == 'production') {
    connectDB();
}

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/countries', countryRoutes);

app.use('/api/cities', cityRoutes);

app.use('/api/messages', messageRoutes);

app.use('/api/conversations', conversationRoutes);

app.use('/api/blogs', blogRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
}

app.listen(PORT, console.log('Server starting at '+PORT));

export default app;