import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import isAdminUtil from "~/util/isAdmin";

export default function Post() {
  const { isAdmin } = useLoaderData<typeof loader>();
  return (
    <div className="lg:p-16">
      <Outlet context={{ isAdmin }} />
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isAdmin = await isAdminUtil(request);

  return json({ isAdmin });
};
