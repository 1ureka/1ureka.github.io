import { fromEntries, toEntries } from "@/utils/typedBuiltins";
import routesJson from "./routes.json";

const entries = toEntries(routesJson);
const dev = fromEntries(entries.map(([key, value]) => [key, value.dev]));
const prod = fromEntries(entries.map(([key, value]) => [key, value.prod]));

export const routes = import.meta.env.PROD ? prod : dev;
