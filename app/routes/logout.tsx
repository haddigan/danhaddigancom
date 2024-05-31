import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "app/modules/auth/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.logout(request, {
    redirectTo: "/",
  });
}
