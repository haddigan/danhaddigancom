import { Outlet } from "@remix-run/react";

export default function Post() {
  return (
    <div className="p-16">
      <Outlet context={{ isAdmin: true }} />
    </div>
  );
}
