import { Link, Form } from "@remix-run/react";

export function Header({ isAdmin }: { isAdmin: boolean }) {
  return (
    <header className="navbar sticky top-0 w-full dark:bg-zinc-700 bg-slate-200 z-10 shadow-neutral-800 shadow-sm">
      <div className="flex-1">
        <Link
          to="/"
          className="link link-hover font-bold px-2 text-xl dark:text-slate-100"
        >
          DanHaddigan.com
        </Link>
      </div>
      {isAdmin && (
        <div className="flex-none gap-2">
          <Link to="/create" className="btn btn-accent">
            Create Post
          </Link>
          <Form action="/auth/logout" method="POST">
            <button className="btn btn-error">Log out</button>
          </Form>
        </div>
      )}
    </header>
  );
}
