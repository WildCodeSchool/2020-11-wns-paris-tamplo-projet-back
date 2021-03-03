import { gql } from 'apollo-server-express'

const typeDefsTeachers = gql`
  type Quiz {
    id: String
    title: String
    created_at: String
    comment: String
    questions: [Questions]
  }

  type Questions {
    idQuiz: String
    question: String
    responses: [Responses]
  }

  type Responses {
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
  }
`

export { typeDefsTeachers as default }
