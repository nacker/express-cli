import { verifyToken } from '../utils/jwt.js';
import ApiResponse from "../utils/response.js";

export const authenticate = (roles = []) => {
  return async (req, res, next) => {
    try {
      // const token = req.headers.authorization?.split(' ')[1];
      const token = req.headers.authorization;
      if (!token) throw new Error('Missing token');

      const decoded = verifyToken(token);
      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error('Insufficient permissions');
      }

      req.user = decoded;
      next();
    } catch (e) {
      ApiResponse.error(res, 401, e.message);
    }
  };
};
