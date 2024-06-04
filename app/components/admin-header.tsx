import { Form, Link } from "@remix-run/react";

export function AdminHeader() {
  return (
    <div
      style={{
        width: "auto",
        color: "white",
        fontSize: "24px",
        backgroundColor: "red",
        lineHeight: "1",
        padding: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ padding: "0", margin: "0" }}>Hi Admin</h2>
        <div style={{ display: "flex", gap: "24px" }}>
          <Link to="post/create">Create Post</Link>
          <Form action="/auth/logout" method="POST">
            <button>Log out</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
