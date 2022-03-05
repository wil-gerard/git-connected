import mongoose from 'mongoose';

const URI = `${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`;

mongoose.connect(`${URI}`, (err) => {
  if (err) throw err;
  console.log('MongoDB connected');
});
