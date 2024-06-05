import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json, LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import isAdminUtil from "~/util/isAdmin";
import { Header } from "~/components/header";
import stylesheet from "~/root.css?url";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesheet }];
};

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
    <div>
      <Header isAdmin={isAdmin} />
      <main className="p-2">
        <Outlet />
      </main>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isAdmin = await isAdminUtil(request);

  return json({ isAdmin });
};
