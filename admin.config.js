import { entities } from "./app/admin/entities";
import { setRuntimeConfig } from "./packages/admin/index.jsx";

export const adminConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API,
  host: process.env.NEXT_PUBLIC_HOST,
  entities,
};

setRuntimeConfig(adminConfig); // runs the instant this file is imported, anywhere
