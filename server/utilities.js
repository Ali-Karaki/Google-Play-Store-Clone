import admin from "firebase-admin";
import sgMail from "@sendgrid/mail";
import { User } from "./schemas/user.schema.js";

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

export async function notifyUsers(type, description, id) {
  sgMail.setApiKey(process.env.apiKey);
  const users = await User.find();
  const emails = users.map((user) => user.email);

  try {
    for (const recipient of emails) {
      const msg = {
        to: recipient,
        from: process.env.emailSender,
        template_id: process.env.template,
        dynamicTemplateData: {
          type: type,
          description: description,
          id: id,
        },
      };
      await sgMail.send(msg);
    }
  } catch (error) {
    console.error(error);
  }
}
