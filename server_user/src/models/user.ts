import { Schema, model } from 'mongoose';
 
const userSchema = new Schema({
    name: {
      type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      confirmPassword: {
        type: String,
      },
});
 
const User = model('User', userSchema);
export default User;