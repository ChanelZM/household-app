import type { Handle, HandleFetch } from "@sveltejs/kit";
import cache from "./utils/cache";

const headerWhitelist = ["content-type", "access-control-allow-origin"];
export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    filterSerializedResponseHeaders: (name) => headerWhitelist.includes(name),
  });
  response.headers.set("X-Frame-Options", "sameorigin");
  return response;
};

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
  request.headers.set("origin", event.url.origin);
  if (request.headers.has("SSR-Cache") === false) {
    return fetch(request);
  }
  const ttl = parseInt(request.headers.get("SSR-Cache") as string, 10);
  request.headers.delete("SSR-Cache");

  return cache(
    keyFromRequest(request),
    (response) => (response.ok ? ttl : 0),
    async () => reusableResponse(await fetch(request)),
  );
};

function keyFromRequest(request: Request) {
  if (request.method !== "GET") {
    throw new Error(`SSR-Cache not supported for ${request.method} requests`);
  }
  return `SSR-Cache_${request.url}\n${request.headers.get("origin")}}`;
}

interface MyData {
  // Define the structure of your JSON response
  key: string;
  value: number;
}

function reusableResponse(res: Response): Response {
  const textPromise = res.text();
  const jsonPromise: Promise<MyData> = textPromise.then(
    (text) => JSON.parse(text) as MyData,
  );
  return {
    ok: res.ok,
    headers: res.headers,
    status: res.status,
    statusText: res.statusText,
    text: () => textPromise,
    json: () => jsonPromise,
  } as Response;
}
