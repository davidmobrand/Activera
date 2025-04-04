import { User, UserRole } from '../types';
import { CreateUserSchema, UpdateUserSchema, UserSchema } from '../validation';
import type { CreateUser } from '../validation';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@activera.com',
    password: 'admin123',
    role: UserRole.ADMIN,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Test Client',
    email: 'client@example.com',
    password: 'client123',
    role: UserRole.CLIENT,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: '$2a$10$mockHashedPassword',
    role: UserRole.CLIENT,
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  },
  {
    id: '4',
    name: 'Michael Chen',
    email: 'michael@example.com',
    password: '$2a$10$mockHashedPassword',
    role: UserRole.CLIENT,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    password: '$2a$10$mockHashedPassword',
    role: UserRole.CLIENT,
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  }
].map(user => UserSchema.parse(user));

// User Database Functions
export const findUserById = (id: string): User | undefined => {
  const user = users.find(user => user.id === id);
  return user ? UserSchema.parse(user) : undefined;
};

export const findUserByEmail = (email: string): User | undefined => {
  const user = users.find(user => user.email === email);
  return user ? UserSchema.parse(user) : undefined;
};

export const findUsers = (): User[] => {
  return users.map(user => UserSchema.parse(user));
};

export const createUser = (data: CreateUser): User => {
  const validatedData = CreateUserSchema.parse(data);
  const now = new Date().toISOString();
  const newUser = {
    ...validatedData,
    id: String(users.length + 1),
    createdAt: now,
    updatedAt: now
  };
  const validatedUser = UserSchema.parse(newUser);
  users.push(validatedUser);
  return validatedUser;
};

export const updateUser = (id: string, data: Partial<User>): User | null => {
  const validatedData = UpdateUserSchema.parse(data);
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    const updatedUser = {
      ...users[index],
      ...validatedData,
      updatedAt: new Date().toISOString()
    };
    const validatedUser = UserSchema.parse(updatedUser);
    users[index] = validatedUser;
    return validatedUser;
  }
  return null;
};

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
}; 