import { tryCatch } from "@/utils/tryCatch";

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
}

interface ApiInfo {
  service: string;
  version: string;
  status: string;
  endpoints: ApiEndpoint[];
}

const getApiInfo = async (apiUrl: string): Promise<ApiInfo | null> => {
  const { data, error } = await tryCatch(fetch(`${apiUrl}`));
  if (error || !data || data.status !== 200) return null;

  const { data: json, error: jsonError } = await tryCatch(data.json());
  if (jsonError || !json) return null;

  return json as ApiInfo;
};

export { getApiInfo };
