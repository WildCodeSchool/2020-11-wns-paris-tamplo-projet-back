import { Schema, model } from 'mongoose'
import { IRessource } from '../types/ressourceType'

const RessourceSchema = new Schema({
  title: { type: String, required: true },
  comment: { type: String },
  url: { type: String },
  tags: [{ type: String }]
})

export default model<IRessource>('ressource', RessourceSchema)
