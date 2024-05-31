import { Authenticator } from "remix-auth";
import { TOTPStrategy } from "remix-auth-totp";
import { sessionStorage } from "./session.server";
import { sendEmail } from "util/emailUtils";
// import { User as UserEntity } from "db";

interface User {
  email: string;
  id: string;
}

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new TOTPStrategy(
    {
      secret: process.env.ENCRYPTION_SECRET || "NOT_A_STRONG_SECRET",
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
      return { id: "admin", email };
    }
  )
);
