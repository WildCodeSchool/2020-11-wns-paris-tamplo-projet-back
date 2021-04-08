import { gql } from 'apollo-server-express'

const typeDefsQuizzes = gql`
  extend type Query {
    quizzes: [Quiz]
  }

  type Quiz {
    id: String
    title: String
    created_at: String
    comment: String
    questions: [Questions]
  }

  type Questions {
    id: String
    question: String
    responses: [Responses]
  }

  type Responses {
    id: String
    response: String
    isCorrect: Boolean
  }

  input inputQuiz {
    title: String
    created_at: String
    comment: String
    questions: [inputQuestions]
  }

  input inputQuestions {
    question: String
    responses: [inputResponses]
  }

  input inputResponses {
    response: String
    isCorrect: Boolean
  }

  extend type Mutation {
    createQuiz(quiz: inputQuiz): Quiz
    updateQuiz(id: String, quiz: inputQuiz): Quiz
    deleteQuiz(id: String): Int
  }
`

export { typeDefsQuizzes as default }
