import { getClient } from "./client";

const resetDatabase = () => {
  const client = getClient();
  return client.reset();
};

export { resetDatabase };
