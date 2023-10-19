import { ZodSchema } from 'zod'
import { parseZodError } from './parseZodError'

export function validate<T>(data: T, validator: ZodSchema<T>) {
  try {
    const validatedData = validator.safeParse(data)

    if (!validatedData.success) {
      const [error] = parseZodError(validatedData.error)

      throw new Error(error.message)
    }

    return {
      success: true,
      data: validatedData.success ? validatedData.data : undefined,
      error: undefined,
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return {
        success: false,
        data: undefined,
        error: error.message as string,
      }
    }

    throw error
  }
}
