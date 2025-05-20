import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  choices: [{
    choice: String,
    impactOnStory: {
      souvenirScore: Number,
      ancragePasse: Number,
      emergenceNostalgie: Number
    }
  }],
  souvenirScore: {
    type: Number,
    default: 0,
  },
  ancragePasse: {
    type: Number,
    default: 0,
  },
  emergenceNostalgie: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  currentLevel: {
    type: Number,
    default: 1
  },
  objetsDebloques: {
    type: [String],
    default: []
  },
  lastLoginDate: {
    type: Date,
    default: Date.now,
  },
  lastSessionDuration: { 
    type: Number, 
    default: 0 },
}, { timestamps: true });


const Profile = mongoose.model('Profile', profileSchema);
export default Profile;