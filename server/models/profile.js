import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Note: Full disclosure, I am not the most knowledgable about MongoDB details. It may have
// been a better idea to save displayPic as a separate schema with a foreign key to profile,
// so that .save() doesn't buffer the display pic in memory for the callback.
const profileSchema = new Schema({
  name: { type: 'String', required: true },
  description: { type: 'String', required: false },
  displayPic: { type: 'Buffer', required: false },
  createdDate: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Profile', profileSchema);
