import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
});

const User =mongoose.models?.User||mongoose.model('User', userSchema);


export default User;