import mongoose, { Schema } from 'mongoose'

const PreviewSchema = new Schema({
  tag_type: String,
  url: String,
})

const Preview = mongoose.models.Preview ?? mongoose.model('Preview', PreviewSchema, 'preview')

export default Preview
