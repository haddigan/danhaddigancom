import { Resource } from "sst";
import type { Router } from "./index";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

export const client = createTRPCClient<Router>({
  links: [
    httpBatchLink({
      url: Resource.Trpc.url,
    }),
  ],
});
