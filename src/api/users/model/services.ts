import { UserModel, User } from './index'

export function getAllUsersService(): Promise<User[]> {
  return UserModel.find()
}

export function getUserByIdService(userId: string): Promise<User | null> {
  return UserModel.findById(userId)
}

export function getUserByEmailService(email: string): Promise<User | null> {
  return UserModel.findOne({ email }).select(
    '+authentication.salt +authentication.password'
  )
}

export function getUserByAccessTokenService(
  accessToken: string
): Promise<User | null> {
  return UserModel.findOne({ 'authentication.accessToken': accessToken })
}

export async function createUserService(
  user: Record<string, any>
): Promise<User> {
  const doc = await new UserModel(user).save()

  return doc.toObject() as User
}

export function updateUserService(
  userId: string,
  user: User
): Promise<User | null> {
  return UserModel.findByIdAndUpdate(userId, user, { new: true })
}

export function deleteUserService(userId: string): Promise<User | null> {
  return UserModel.findByIdAndDelete(userId)
}
