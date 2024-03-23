import mongoose, { Schema, mongo } from 'mongoose'

const ProjectSchema = new Schema({
  freelancerId: String,
  portfolioId: String,
  title: {
    type: String,
    required: true,
  },
  previews: [
    {
      type: Schema.ObjectId,
      ref: 'Preview',
    },
  ],
  skills: [String],
  description: String,
  url: String,
})

const Project = mongoose.models.Project ?? mongoose.model('Project', ProjectSchema, 'portfolio')

export default Project
