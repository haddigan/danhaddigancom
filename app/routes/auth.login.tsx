import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { authenticator } from "app/modules/auth/auth.server";
import { getSession, commitSession } from "app/modules/auth/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/account",
  });
  const session = await getSession(request.headers.get("Cookie"));
  const authError = session.get(authenticator.sessionErrorKey);

  // Commit session to clear any `flash` error message.
  return json(
    { authError },
    {
      headers: {
        "set-cookie": await commitSession(session),
      },
    }
  );
}

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.authenticate("TOTP", request, {
    // The `successRedirect` route will be used to verify the OTP code.
    // This could be the current pathname or any other route that renders the verification form.
    // For Magic Link, stay on current page
    successRedirect: "/auth/login?sent=true",

    // For TOTP Code, redirect to the verification page
    // successRedirect: "/auth/verify",

    // The `failureRedirect` route will be used to render any possible error.
    // If not provided, ErrorBoundary will be rendered instead.
    failureRedirect: "/auth/login",
  });
  return {};
}

export default function Login() {
  const { authError } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const isLoginLinkSent = searchParams.get("sent");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {isLoginLinkSent && <h1>Check your email for the code.</h1>}
      {!isLoginLinkSent && (
        <Form method="POST">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Insert email .."
            required
          />
          <button type="submit">Send Code</button>
        </Form>
      )}

      {/* Login Errors Handling. */}
      <span>{authError?.message}</span>
    </div>
  );
}
