import jwt from 'jsonwebtoken';


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