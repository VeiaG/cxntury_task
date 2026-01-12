import { Request, Response } from 'express';
import {Session} from '../models';
import { SessionResponse } from '@repo/shared-types';


export const getSession = async (_req: Request, res: Response): Promise<void> => {
  try {
    const session = await Session.create({
        token: crypto.randomUUID(),
    })
    const response:SessionResponse ={
        id: session.id,
        token: session.token,
    }
    res.json(response);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
};