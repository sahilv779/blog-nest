import { Request } from 'express';

// ✅ Extend the Express Request type to include user
export interface RequestWithUser extends Request {
  user?: any; // Replace `any` with your actual User type (e.g., UserDocument)
}
