import { UserInputError, ApolloError } from 'apollo-server-express'
import RessourceSchema from '../../models/ressource'

import { IRessource } from '../../types/ressourceType'

export const getRessources = async (): Promise<IRessource[]> => {
  try {
    return await RessourceSchema.find()
  } catch (error) {
    console.error(error)
    throw new ApolloError("Can't get ressources.")
  }
}

export const addRessource = async (_: any, args: any): Promise<IRessource> => {
  const ressourcePayload = args?.ressource
  if (!ressourcePayload || !ressourcePayload.title) {
    throw new UserInputError(`Missing args.`, {
      invalidArgs: [
        {
          ressourcePayload
        }
      ]
    })
  }
  try {
    const ressource = new RessourceSchema({
      title: ressourcePayload?.title,
      comment: ressourcePayload?.comment,
      url: ressourcePayload?.url,
      tags: ressourcePayload?.tags
    })
    await ressource.save()
    return ressource
  } catch (error) {
    console.error(error)
    throw new ApolloError("Can't add ressource.")
  }
}

export const updateExistingRessource = async (
  _: any,
  args: any
): Promise<IRessource> => {
  const id = args?.id
  const ressourceCred = args?.ressource
  if (!id || !ressourceCred || !ressourceCred.title) {
    throw new UserInputError(`Missing args`, {
      invalidArgs: [{ id, ressourceCred }]
    })
  }
  try {
    const ressource = await RessourceSchema.findByIdAndUpdate(
      { _id: id },
      ressourceCred,
      { new: true }
    )
    if (!ressource) {
      throw new ApolloError("This ressource doesn't exist.")
    }
    return ressource
  } catch (error) {
    console.error(error)
    throw new ApolloError(error.message || 'Can\t modify this ressource.')
  }
}

export const deleteOneRessource = async (
  _: any,
  args: any
): Promise<number | undefined> => {
  const id = args?.id
  if (!id || id.length === 0) {
    throw new UserInputError(`Missing ressource id`, {
      invalidArgs: [{ id }]
    })
  }
  try {
    const ressource = await RessourceSchema.deleteOne({ _id: id })
    if (!ressource) {
      throw new ApolloError("This ressource doesn't exist.")
    }
    return ressource.n
  } catch (error) {
    console.error(error)
    throw new Error(error.message || "Can't delete this ressource.")
  }
}
