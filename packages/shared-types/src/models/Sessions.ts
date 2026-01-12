
export interface SessionAttributes {
  id: number;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * GET session response type
 */
export interface SessionResponse {
    id: number;
    token: string;
}