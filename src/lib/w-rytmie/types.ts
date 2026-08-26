export type AvatarId = "luna" | "violet" | "iris" | "nova";
export type Profile = { name: string; avatar: AvatarId; birthYear: number; heightCm: number; weightKg: number; lastPeriod: string; cycleLength: number; periodLength: number; usualSymptoms: string[]; primaryGoal: string; };
export type Checkin = { date: string; energy: number; mood: number; sleepHours: number; pain: number; stress: number; bleeding: "none" | "light" | "medium" | "heavy"; };
export type MealEntry = { id: string; name: string; kcal: number; protein: number; carbs: number; fat: number; iron?: number; magnesium?: number; omega3?: number; };
export type ActivityEntry = { id: string; name: string; minutes: number; effort: number; category: "training" | "daily" | "recovery"; muscles: string[]; };
export type JournalEntry = { id: string; date: string; text: string; prompt: string; };
export type PlanItem = { id: string; label: string; done: boolean; kind: "body" | "food" | "mind" | "support"; };
export type AppState = { profile: Profile | null; checkins: Checkin[]; meals: MealEntry[]; activities: ActivityEntry[]; journals: JournalEntry[]; plan: PlanItem[]; };
