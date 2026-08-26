import type { AppState } from "./types";
export const STORAGE_KEY = "w-rytmie-state-v1";
export const emptyState: AppState = { profile: null, checkins: [], meals: [], activities: [], journals: [], plan: [] };
export function loadState(): AppState { if (typeof window === "undefined") return emptyState; try { const stored = window.localStorage.getItem(STORAGE_KEY); return stored ? { ...emptyState, ...JSON.parse(stored) } : emptyState; } catch { return emptyState; } }
export function saveState(state: AppState) { if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
