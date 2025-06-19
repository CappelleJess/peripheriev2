import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  key: { type: String, required: true },
  sprite: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  scale: { type: Number, default: 1 },
  type: { type: String, enum: ['interactive', 'extra'], required: true },
  choices: { type: Object, default: {} },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Asset', assetSchema);
