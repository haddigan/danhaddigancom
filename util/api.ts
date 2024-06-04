import { Resource } from "sst";
import type { Router } from "api/index";
import {
  createTRPCClient,
  httpBatchLink,
  type HTTPHeaders,
} from "@trpc/client";
import { authenticator } from "~/modules/auth/auth.server";
import { getSession } from "~/modules/auth/session.server";
import type { LoaderFunctionArgs } from "@remix-run/node";

const createClientWithDynamicHeaders = () => {
  let request: LoaderFunctionArgs["request"] | null = null;

  const headersFn = async (): Promise<HTTPHeaders> => {
    const session = await getSession(request?.headers.get("Cookie"));
    const user = await authenticator.isAuthenticated(session);
    return { Authorization: `Bearer ${user?.token}` || "" };
  };

  const client = createTRPCClient<Router>({
    links: [
      httpBatchLink({
        url: Resource.Trpc.url,
        headers: headersFn,
      }),
    ],
  });

  const setRequest = (req: LoaderFunctionArgs["request"]) => {
    request = req;
  };

  return (request: LoaderFunctionArgs["request"]) => {
    setRequest(request);
    return client;
  };
};

export const client = createClientWithDynamicHeaders();
