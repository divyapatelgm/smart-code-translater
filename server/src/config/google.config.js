import { OAuth2Client } from "google-auth-library";

//The OAuth2Client is initialized with our Google Client ID from the .env file. 
// This client will be used to verify tokens sent from the frontend.
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (credential) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  } catch (error) {
    throw new Error("Invalid Google token");
  }
};

export { googleClient, verifyGoogleToken };