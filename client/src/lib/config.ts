/** Origin of the backend API, e.g. http://localhost:8080 (no trailing slash, no /api). */
export const API_URL: string = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

/** Build an absolute URL for a backend path such as "/api/sales". */
export const apiUrl = (path: string): string => `${API_URL}${path}`;
