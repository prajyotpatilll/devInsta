import mongoose from 'mongoose';

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'User' },
  phone: { type: String, default: '0000000000' },
  gender: { type: String, default: 'select' },
  dob: { type: String, default: 'select' },
  description: { type: String, default: '' },
  resume: { type: String, default: '' },
  profile_photo: { type: String, default: '' },
  skills: [
    {
      name: { type: String, required: true },
      use: { type: String, default: '' }
    }
  ],
  projects: [
    {
      name: { type: String, required: true },
      photo: { type: String, default: '' },
      technologies: { type: [String], default: [] },
      github_link: { type: String, default: '' },
      live_preview_link: { type: String, default: '' }
    }
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const userModel = mongoose.models.user || mongoose.model('user', UserSchema)

export default userModel
