import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/modules/auth/auth.server";
import { AdminHeader } from "~/components/admin-header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { isAdmin } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {isAdmin && <AdminHeader />}
      <header>
        <Link
          to="/"
          style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            color: "black",
            textDecoration: "none",
          }}
        >
          Dan Haddigan.com
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);

  return json({ isAdmin: user?.id === "admin" });
};
