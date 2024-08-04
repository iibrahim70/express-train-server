/* eslint-disable no-unused-vars */

import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the type for the callback used in verifyToken
type TCallBack = (err: Error | null, decoded?: JwtPayload) => void;

// Function to create a JWT token
export const createToken = (
  jwtPayload: { email: string; role: string }, // Payload to be encoded in the token
  secret: string,
  expiresIn: string,
) => {
  // Sign the JWT token using jwt.sign
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

// Function to verify a JWT token
export const verifyToken = (token: string, secret: string, cb: TCallBack) => {
  // Verify the JWT token using jwt.verify
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      // If an error occurs during verification, pass it to the callback
      return cb(err);
    }
    // If verification succeeds, pass the decoded payload to the callback
    cb(null, decoded as JwtPayload);
  });
};
