import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// https://mswjs.io/docs/getting-started/integrate/node
export const server = setupServer(...handlers);
