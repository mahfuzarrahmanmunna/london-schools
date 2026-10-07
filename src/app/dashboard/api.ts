export const apiRoot = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000")
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

export const apiUrl = `${apiRoot}/api`;
export const leadsApiUrl = `${apiUrl}/leads`;

export async function fetchApi<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const result: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof result === "object" &&
      result !== null &&
      "message" in result &&
      typeof result.message === "string"
        ? result.message
        : `Request failed (${response.status})`;
    throw new Error(message);
  }

  return result as T;
}

export const dashboardQueryKeys = {
  leads: ["leads"] as const,
  lead: (id: string) => ["leads", id] as const,
  dashboard: ["dashboard-summary"] as const,
  leadMetadata: ["lead-metadata"] as const,
  followUps: ["follow-ups"] as const,
};
