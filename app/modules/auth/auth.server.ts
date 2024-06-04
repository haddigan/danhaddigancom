import { Authenticator } from "remix-auth";
import { TOTPStrategy } from "remix-auth-totp";
import { Resource } from "sst";
import { sessionStorage } from "./session.server";
import { sendEmail } from "util/emailUtils";
import jwt from "jsonwebtoken";
// import { User as UserEntity } from "db";

interface User {
  email: string;
  id: string;
  token: string;
}

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new TOTPStrategy(
    {
      magicLinkPath: "/auth/magic-link",
      secret: Resource.EncryptionSecret.value,
      sendTOTP: async ({ email, magicLink }) => {
        if (email === process.env.ADMIN_EMAIL) {
          await sendEmail({
            to: email,
            subject: "DanHaddigan.com **MAGIC LINK**",
            body: `Click this link to log in: ${magicLink}`,
          });
        }
      },
    },
    async ({ email }) => {
      // Typically we'd do a lookup in the database and return the user
      // In this instance we have only one user, me :)
      const token = jwt.sign({ email }, Resource.EncryptionSecret.value);
      return { id: "admin", email, token };
    }
  )
);
