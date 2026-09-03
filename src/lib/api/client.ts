import type {
  ApiCategory,
  ApiContact,
  ApiHome,
  ApiPractice,
  ApiProcess,
  ApiProject,
  ApiReview,
  ApiService,
  ApiStat,
  LeadPayload,
  SiteData,
} from "./types";

export const API_BASE_URL = "https://app.charulprojects.com";

/** Resolve relative media paths from Django to absolute URLs. */
export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function unwrapList<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object" && "results" in data) {
    const results = (data as { results: unknown }).results;
    if (Array.isArray(results)) return results as T[];
  }
  return [];
}

async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchSiteData(): Promise<SiteData> {
  const [
    home,
    practice,
    services,
    projects,
    process,
    reviews,
    stats,
    contactRaw,
  ] = await Promise.all([
    apiGet<unknown>("/api/home/"),
    apiGet<unknown>("/api/practice/"),
    apiGet<unknown>("/api/services/"),
    apiGet<unknown>("/api/projects/"),
    apiGet<unknown>("/api/process/"),
    apiGet<unknown>("/api/reviews/"),
    apiGet<unknown>("/api/stats/"),
    apiGet<unknown>("/api/contact/"),
  ]);

  const contacts = unwrapList<ApiContact>(contactRaw);

  return {
    home: unwrapList<ApiHome>(home),
    practice: unwrapList<ApiPractice>(practice),
    services: unwrapList<ApiService>(services),
    projects: unwrapList<ApiProject>(projects),
    process: unwrapList<ApiProcess>(process),
    reviews: unwrapList<ApiReview>(reviews),
    stats: unwrapList<ApiStat>(stats),
    contact: contacts[0] ?? null,
  };
}

export async function createLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact/leads/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const message =
        body && typeof body === "object"
          ? Object.values(body).flat().join(" ")
          : "Could not send your message.";
      return { ok: false, error: message || "Could not send your message." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Could not reach the server. Try again shortly." };
  }
}
