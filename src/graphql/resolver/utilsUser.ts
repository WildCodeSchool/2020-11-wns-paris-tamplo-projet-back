import UserSchema from '../../models/user'

export const answerToQuiz = async (_: any, args: any) => {
  try {
    const user = await UserSchema.findOne({ _id: args.id })
    const info = {
      id_quiz: args.responses.id_quiz,
      note: args.responses.note
    }
    user?.responsesToQuizzes.push(info)
    user?.save()
    return true
  } catch (error) {
    throw new Error("Impossible d'ajouter une note à ce quiz.")
  }
}
