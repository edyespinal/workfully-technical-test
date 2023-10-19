import z from 'zod'

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  lastName: z.string().optional(),
})

export type User = z.infer<typeof userSchema>
