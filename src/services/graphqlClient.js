import { GraphQLClient } from 'graphql-request'
import { BASE_URL } from '../utils/constant'

export const graphqlClient = new GraphQLClient(
  `${BASE_URL}/graphql`
)