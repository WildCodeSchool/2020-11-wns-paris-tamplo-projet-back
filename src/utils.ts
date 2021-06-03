import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AuthenticationError } from 'apollo-server'

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET as string

export const getTokenPayload = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    throw new AuthenticationError(`Token verification failed: ${err.message}`)
  }
}

export const getUserData = (req: any) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new AuthenticationError(
      'Authentification Error: You must be logged in.'
    )
  }

  const token = authHeader.replace('Bearer ', '')
  if (!token) {
    throw new AuthenticationError(
      'Token Authentification Error: You must be logged in.'
    )
  }
  const { id, status } = getTokenPayload(token)
  return { id, status }
}
