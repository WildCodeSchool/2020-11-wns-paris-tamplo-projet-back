import RessourceSchema from '../../models/ressource'

import { IRessource } from '../../types/ressourceType'

export const getRessources = async (): Promise<IRessource[]> => {
  try {
    return await RessourceSchema.find()
  } catch (error) {
    console.error(error)
    throw new Error('Impossible de récupérer les ressources, problème server.')
  }
}

export const addRessource = async (_: any, args: any): Promise<IRessource> => {
  try {
    const ressource = await new RessourceSchema({
      title: args.ressource.title,
      comment: args.ressource.comment,
      url: args.ressource.url,
      tags: args.ressource.tags
    })
    await ressource.save()
    return ressource
  } catch (error) {
    console.error(error)
    throw new Error("Impossible d'ajouter une ressource, essayez plus tard.")
  }
}

export const updateExistingRessource = async (
  _: any,
  args: any
): Promise<IRessource> => {
  try {
    const ressource = await RessourceSchema.findByIdAndUpdate(
      { _id: args.id },
      args.ressource,
      { new: true }
    )
    if (!ressource) {
      throw new Error("Cette référence n'existe pas")
    }
    return ressource
  } catch (error) {
    console.error(error)
    throw new Error("Impossible de modifier cette ressource pour l'instant.")
  }
}

export const deleteOneRessource = async (
  _: any,
  args: any
): Promise<IRessource> => {
  try {
    const ressource = await RessourceSchema.deleteOne({ _id: args.id })
    return ressource.n
  } catch (error) {
    console.error(error)
    throw new Error("Impossible de supprimer cette ressource pour l'instant.")
  }
}
