import BaseModel from './BaseModel';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export class UserModel extends BaseModel {
  protected static tableName = 'users';

  // Find user by username
  static async findByUsername(username: string): Promise<User | null> {
    return await this.findBy({ username });
  }

  // Find user by email
  static async findByEmail(email: string): Promise<User | null> {
    return await this.findBy({ email });
  }

  // Create user with hashed password
  static async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const userToCreate = {
      ...userData,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    };

    return await this.create(userToCreate);
  }

  // Verify user password
  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  // Update user password
  static async updatePassword(id: number, newPassword: string): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await this.update(id, { password: hashedPassword });
  }

  // Get user without password
  static async findByIdSafe(id: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.findById(id);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  // Check if username exists
  static async usernameExists(username: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return !!user;
  }

  // Check if email exists
  static async emailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }
}

export default UserModel;
