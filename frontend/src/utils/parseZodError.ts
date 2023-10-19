import { ZodError } from 'zod'

export function parseZodError(error: ZodError) {
  return JSON.parse(error.message)
}
