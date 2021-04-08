import { gql } from 'apollo-server-express'

const typeDefsRessources = gql`
  extend type Query {
    ressources: [Ressource]
  }

  type Ressource {
    id: String
    title: String
    comment: String
    url: String
    tags: [String]
  }

  input inputRessource {
    title: String
    comment: String
    url: String
    tags: [String]
  }

  extend type Mutation {
    createRessource(ressource: inputRessource): Ressource
    updateRessource(id: String, ressource: inputRessource): Ressource
  }
`

export { typeDefsRessources as default }
