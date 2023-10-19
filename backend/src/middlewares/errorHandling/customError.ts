export type CustomErrorArgs = {
  message?: string
  status: number
  code:
    | 'AUTHENTICATION_ERROR'
    | 'BAD_REQUEST'
    | 'NOT_FOUND'
    | 'INTERNAL_SERVER_ERROR'
  reason: string
}

export class CustomError extends Error {
  constructor({ message, status, code, reason }: CustomErrorArgs) {
    super(message)
    this.name = 'CustomError'
    this.status = status
    this.code = code
    this.reason = reason
  }

  public status: number
  public code: CustomErrorArgs['code']
  public reason: string
}
