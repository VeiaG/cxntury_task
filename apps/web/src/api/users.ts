// Example of using shared types from @repo/shared-types on the frontend
import type { UserResponse, UsersListResponse, UserCreationAttributes } from '@repo/shared-types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const fetchUsers = async (): Promise<UsersListResponse> => {
  const response = await fetch(`${API_URL}/api/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const fetchUserById = async (id: number): Promise<UserResponse> => {
  const response = await fetch(`${API_URL}/api/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

export const createUser = async (userData: UserCreationAttributes): Promise<UserResponse> => {
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
};
