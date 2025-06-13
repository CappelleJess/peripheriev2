import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['memory', 'interactive', 'decorative'],
    default: 'interactive',
  },
  description: {
    type: String,
  },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  textureKey: {
    type: String,
    required: true,
  },
  scene: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isMemoryUnlocked: {
    type: Boolean,
    default: false,
  },
  dialogue: {
    examine: { type: String, default: "" },
    smell: { type: String, default: "" },
    ignore: { type: String, default: "" },
  },
  effects: {
    souvenirScore: { type: Number, default: 0 },
    ancragePasse: { type: Number, default: 0 },
    emergenceNostalgie: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Asset', assetSchema);