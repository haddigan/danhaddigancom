import { authenticator } from "~/modules/auth/auth.server";

export default async function isAdmin(request: Request) {
  const user = await authenticator.isAuthenticated(request);

  return user?.id === "admin";
}
