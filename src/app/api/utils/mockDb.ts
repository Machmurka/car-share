// car_project/app/api/utils/mockDb.ts

export interface User {
    email: string;
    password: string;
  }
  
  // In-memory user list
  export const mockUsers: User[] = [];
  
  // In-memory store of reset tokens: token -> user email
  // In a real app, you'd store these in a database with expiration times
  export const resetTokens: Record<string, string> = {};
  