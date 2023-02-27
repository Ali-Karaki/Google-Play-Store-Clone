import admin from "firebase-admin";

export async function authenticate(req) {
  const response = {
    status: 401,
    message: "Unauthorized",
    userData: {},
  };

  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      return response;
    }

    const splitBearer = authorization.split("Bearer ");
    if (splitBearer.length !== 2) {
      return response;
    }

    const userToken = splitBearer[1];

    const decodedToken = await admin.auth().verifyIdToken(userToken);
    response.status = 200;
    response.message = "";
    response.userData = { ...decodedToken };
    return response;
  } catch (err) {
    return response;
  }
}
