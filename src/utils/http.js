/**
 * JSON fetch helper — throws on non-OK responses (similar to axios behavior).
 */
export async function fetchJson(url, options = {}) {
  const { method = "GET", body, headers: extraHeaders = {} } = options;
  const headers = { ...extraHeaders };
  const init = { method, headers };

  if (body !== undefined && body !== null) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url, init);
  const text = await res.text();
  let parsed = null;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }

  if (!res.ok) {
    const msg =
      (parsed &&
        typeof parsed === "object" &&
        (parsed.message || parsed.error || parsed.detail)) ||
      `${res.status} ${res.statusText}`;
    throw new Error(typeof msg === "string" ? msg : "Request failed");
  }

  return parsed;
}
