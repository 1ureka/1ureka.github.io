import routesJson from "./routes.json";

function fromEntries<K extends PropertyKey, V>(entries: [K, V][]): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

function toEntries<T extends Record<PropertyKey, unknown>>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

type Routes = {
  readonly home: string;

  readonly login: string;
  readonly register: string;
  readonly verify: string;

  readonly post: string;
  readonly posts: string;
  readonly search: string;
  readonly users: string;
};

const entries = toEntries(routesJson);
const dev: Routes = fromEntries(entries.map(([key, value]) => [key, `/src/forum/pages${value}/index.html`]));
const prod: Routes = routesJson;

export const routes = import.meta.env.PROD ? prod : dev;
