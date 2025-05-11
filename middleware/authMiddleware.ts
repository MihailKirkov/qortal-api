import { Request, Response, NextFunction } from 'express';

export const authenticateWithToken = (req: Request, res: Response, next: NextFunction): void => {
    // Extract token from the Authorization header
    const token = req.headers['authorization']?.split('Bearer ')[1];

    // Check if token is provided
    if (!token) {
        res.status(401).json({ error: 'Authorization token is missing' });
        return;  // Stop execution here
    }

    // Compare the token with the one in environment variables
    if (token !== process.env.API_SECRET_KEY) {
        res.status(403).json({ error: 'Forbidden: Invalid API key' });
        return; 
    }

    // Token is valid, proceed to the next middleware or handler
    next();
};
