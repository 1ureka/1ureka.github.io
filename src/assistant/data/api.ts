import { tryCatch } from "@/utils/tryCatch";
import { useApiUrl } from "../hooks/store";
import { createDeferred } from "@/utils/async";

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

interface QueryOptions {
  onMessage: (fullResponse: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: string) => void;
}

const queryApi = (question: string, options: QueryOptions) => {
  const { onMessage, onComplete, onError } = options;

  const encodedQuestion = encodeURIComponent(question);
  const apiUrl = useApiUrl();
  const url = new URL(`${apiUrl}/query?question=${encodedQuestion}`);

  let fullResponse = "";
  const deferred = createDeferred<void>();
  const eventSource = new EventSource(url.toString());

  const close = () => {
    eventSource.close();
    deferred.resolve();
  };

  eventSource.addEventListener("message", (e) => {
    const { data } = e;
    fullResponse += data;
    fullResponse = fullResponse.replace(/\\n/g, "\n");
    onMessage(fullResponse);
  });

  eventSource.addEventListener("error", () => {
    if (fullResponse) onComplete?.(fullResponse);
    else onError?.("請求失敗，請稍後再試。");
    close();
  });

  return { close, promise: deferred.promise };
};

export { getApiInfo, queryApi };
