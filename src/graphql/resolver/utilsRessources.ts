import RessourceSchema from '../../models/ressource'

import { IRessource } from '../../types/ressourceType'

export const getRessources = async (): Promise<IRessource[]> => {
  try {
    return await RessourceSchema.find()
  } catch (error) {
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
