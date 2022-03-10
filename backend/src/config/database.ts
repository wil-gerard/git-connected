import mongoose from 'mongoose';

mongoose.connect(`${process.env.MONGODB_URL}`, (err) => {
  if (err) throw err;
});