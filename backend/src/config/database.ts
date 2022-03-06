import mongoose from 'mongoose';

const URI = `${process.env.MONGODB_URI_START}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_URI_END}`;

mongoose.connect(`${URI}`, (err) => {
  if (err) throw err;
  console.log('MongoDB connected');
});
