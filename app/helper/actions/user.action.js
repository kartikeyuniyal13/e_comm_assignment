"use server";
import User from '@/app/models/User';
import { connectToDb } from '@/app/helper/db';

export async function createUser(userData) {
  try {
    await connectToDb();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

async function deleteUser(clerkId) {
  try {
    const deletedUser = await User.findOneAndDelete({ clerkId });
    if (!deletedUser) {
      throw new Error(`User with clerkId ${clerkId} not found`);
    }
    return deletedUser;
  } catch (error) {
    throw new Error(`Error deleting user by clerkId: ${error.message}`);
  }
}
