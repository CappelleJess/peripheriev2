import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false
  },
  roles: {
    type: [String],
    enum: ['user', 'admin'], 
    default: ['user'],
  }
}, {
  timestamps: true // Ajoute createdAt / updatedAt automatiquement
});

const User = mongoose.model('User', userSchema);
export default User;