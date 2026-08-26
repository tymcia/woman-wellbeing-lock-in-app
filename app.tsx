"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, Apple, BarChart3, BookHeart, CalendarDays, CheckCircle2, Heart, LayoutDashboard, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Onboarding } from "./onboarding";
import { DashboardView, FoodView, JournalView, MovementView, PlanView, ProgressView, SupportView } from "./features";
import { cycleContext, readiness, readinessCopy, smartTip, todayISO } from "@/lib/w-rytmie/logic";
import { emptyState, loadState, saveState } from "@/lib/w-rytmie/storage";
import type { AppState, Checkin, Profile } from "@/lib/w-rytmie/types";

const avatarFace = { luna: "👩🏻", violet: "👩🏼‍🦱", iris: "👩🏽", nova: "👩🏾‍🦰" };

function Metric({ label, value, onChange, low, high }: { label: string; value: number; onChange: (value: number) => void; low: string; high: string }) {
  return <div className="rounded-2xl border bg-white p-4"><div className="mb-4 flex items-center justify-between"><span className="text-sm font-semibold">{label}</span><span className="rounded-full bg-[#efe5f6] px-2.5 py-1 text-xs font-bold text-primary">{value}/10</span></div><Slider value={[value]} min={0} max={10} step={1} onValueChange={(v) => onChange(v[0])} /><div className="mt-2 flex justify-between text-[11px] text-muted-foreground"><span>{low}</span><span>{high}</span></div></div>;
}

function TodayView({ state, setState }: { state: AppState; setState: (state: AppState) => void }) {
  const profile = state.profile!;
  const existing = state.checkins.find((item) => item.date === todayISO());
  const [draft, setDraft] = useState<Checkin>(existing ?? { date: todayISO(), energy: 5, mood: 5, sleepHours: 7, pain: 2, stress: 4, bleeding: "none" });
  const score = readiness(existing);
  const copy = readinessCopy(score);
  const context = cycleContext(profile);
  function saveCheckin() { setState({ ...state, checkins: [...state.checkins.filter((item) => item.date !== draft.date), draft] }); }

  return <div className="space-y-5"><section className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
    <article className="relative overflow-hidden rounded-[2rem] bg-[#68468e] p-6 text-white shadow-[0_20px_50px_rgba(80,48,110,.16)] sm:p-8"><div className="absolute right-5 top-4 size-44 rounded-full border border-white/10" /><div className="absolute right-12 top-12 size-28 rounded-full border border-dashed border-white/20" /><div className="relative flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-[#eadff4]">Dzień dobry, {profile.name}</p><h1 className="mt-2 max-w-xl text-3xl font-semibold leading-tight">{existing ? copy.label : "Jak dziś czujesz się w swoim ciele?"}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#eadff4]">{existing ? copy.tone : "Minuta wystarczy, żeby plan dnia był bardziej Twój."}</p></div><div className="relative orbital-avatar mx-5 grid size-20 shrink-0 place-items-center rounded-full bg-[#c9a8df] text-4xl">{avatarFace[profile.avatar]}</div></div>{existing && <div className="relative mt-8 rounded-2xl bg-white/10 p-4"><div className="mb-2 flex items-center justify-between text-sm"><span>Dzisiejsza gotowość</span><b>{score}%</b></div><Progress value={score} className="h-2 bg-white/20 [&_[data-slot=progress-indicator]]:bg-white" /></div>}</article>
    <article className="rounded-[2rem] border bg-card p-6 shadow-sm"><div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-2xl bg-[#eee4f5] text-primary"><CalendarDays className="size-5" /></span><span className="text-xs font-semibold text-muted-foreground">około {context.day}. dnia</span></div><p className="mt-5 text-sm text-muted-foreground">Kontekst cyklu</p><h2 className="mt-1 text-xl font-semibold">{context.label}</h2><p className="mt-2 text-sm text-muted-foreground">{context.short}. To szacunek — najważniejsze jest Twoje dzisiejsze samopoczucie.</p><div className="mt-5 flex gap-1.5">{Array.from({length: 8}).map((_, i) => <span key={i} className={`h-2 flex-1 rounded-full ${i < Math.ceil((context.day / profile.cycleLength) * 8) ? "bg-primary" : "bg-[#e8dfed]"}`} />)}</div></article>
  </section>
  <section className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
    <article className="rounded-[2rem] border bg-card p-6 shadow-sm sm:p-7"><div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-semibold text-primary">Body check-in</p><h2 className="mt-1 text-xl font-semibold">Jedna minuta dla siebie</h2></div>{existing && <span className="flex items-center gap-1.5 text-xs font-semibold text-[#4e8264]"><CheckCircle2 className="size-4" /> Zapisane</span>}</div><div className="grid gap-3 sm:grid-cols-2"><Metric label="Energia" value={draft.energy} onChange={(energy) => setDraft({...draft, energy})} low="brak sił" high="dużo energii" /><Metric label="Nastrój" value={draft.mood} onChange={(mood) => setDraft({...draft, mood})} low="ciężko" high="bardzo dobrze" /><Metric label="Ból" value={draft.pain} onChange={(pain) => setDraft({...draft, pain})} low="bez bólu" high="silny" /><Metric label="Stres" value={draft.stress} onChange={(stress) => setDraft({...draft, stress})} low="spokojnie" high="bardzo wysoki" /></div><div className="mt-4 flex flex-col gap-4 rounded-2xl bg-[#f3edf7] p-4 sm:flex-row sm:items-center"><label className="flex flex-1 items-center justify-between gap-4 text-sm font-semibold">Sen ostatniej nocy <input aria-label="Liczba godzin snu" type="number" min="0" max="14" step="0.5" value={draft.sleepHours} onChange={(e) => setDraft({...draft, sleepHours: Number(e.target.value)})} className="h-10 w-24 rounded-xl border bg-white px-3 text-center" /></label><Button onClick={saveCheckin} className="h-11 rounded-xl px-5">Zapisz check-in <Heart /></Button></div></article>
    <div className="space-y-5"><article className="rounded-[2rem] border bg-[#fff9ed] p-6 shadow-sm"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-2xl bg-[#f6e4b7] text-[#8a641a]">✨</span><div><p className="text-xs font-bold uppercase tracking-wider text-[#8a641a]">Smart tip</p><h2 className="font-semibold">Dla Ciebie na dziś</h2></div></div><p className="mt-4 text-sm leading-6 text-[#5c5141]">{smartTip(profile, existing)}</p><p className="mt-4 text-xs font-semibold text-[#7d5a16]">Na podstawie samopoczucia i kontekstu cyklu</p></article><article className="rounded-[2rem] border bg-card p-6 shadow-sm"><p className="text-sm font-semibold text-primary">Małe rzeczy też się liczą</p><h2 className="mt-1 text-xl font-semibold">Dzisiejszy progres</h2><div className="mt-4 space-y-3">{[{icon:"💧",label:"Nawodnienie",done:true},{icon:"🍽️",label:"Pełny posiłek",done:false},{icon:"🌿",label:"Chwila regeneracji",done:false}].map((item) => <div key={item.label} className="flex items-center gap-3 rounded-xl bg-[#f6f1f8] p-3"><span className="grid size-9 place-items-center rounded-xl bg-white">{item.icon}</span><span className="flex-1 text-sm font-medium">{item.label}</span>{item.done ? <CheckCircle2 className="size-5 text-[#5f8c70]" /> : <Plus className="size-5 text-muted-foreground" />}</div>)}</div></article></div>
  </section></div>;
}

export function WRytmieApp() {
  const [state, setState] = useState<AppState>(emptyState);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("today");
  useEffect(() => { setState(loadState()); setLoaded(true); }, []);
  useEffect(() => { if (loaded) saveState(state); }, [state, loaded]);
  const profile = state.profile;
  const todayActivity = useMemo(() => state.activities.reduce((sum, item) => sum + item.minutes, 0), [state.activities]);
  if (!loaded) return <div className="min-h-screen bg-background" />;
  if (!profile) return <Onboarding onComplete={(newProfile: Profile) => setState({ ...state, profile: newProfile })} />;
  const nav = [["today", "Dzisiaj", LayoutDashboard], ["food", "Jedzenie", Apple], ["journal", "Journal", BookHeart], ["movement", "Ruch", Activity], ["plan", "Plan", CalendarDays], ["support", "Wsparcie", Users], ["progress", "Progres", CheckCircle2], ["dashboard", "Dashboard", BarChart3]] as const;
  const view = tab === "today" ? <TodayView state={state} setState={setState} /> : tab === "food" ? <FoodView state={state} setState={setState} /> : tab === "journal" ? <JournalView state={state} setState={setState} /> : tab === "movement" ? <MovementView state={state} setState={setState} /> : tab === "plan" ? <PlanView state={state} setState={setState} /> : tab === "support" ? <SupportView /> : tab === "progress" ? <ProgressView state={state} setState={setState} /> : <DashboardView state={state} setState={setState} />;
  return <main className="soft-grid min-h-screen px-3 py-3 sm:px-5 sm:py-5"><div className="mx-auto max-w-[1500px] overflow-hidden rounded-[2rem] border bg-[#fbf9fc]/95 shadow-[0_24px_80px_rgba(76,48,95,.11)]"><header className="flex flex-wrap items-center justify-between gap-4 border-b bg-white/80 px-5 py-4 sm:px-7"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-2xl bg-primary text-white"><Heart className="size-5" /></span><div><p className="text-xs font-bold tracking-[.22em] text-primary">W RYTMIE</p><p className="text-xs text-muted-foreground">Twoje ciało. Twój rytm.</p></div></div><div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-semibold">{profile.name}</p><p className="text-xs text-muted-foreground">{todayActivity} min ruchu</p></div><span className="grid size-11 place-items-center rounded-full bg-[#d0b6e2] text-2xl">{avatarFace[profile.avatar]}</span></div></header><Tabs value={tab} onValueChange={setTab}><div className="border-b bg-white/60 px-4 py-2"><TabsList className="scrollbar-none flex w-full justify-start overflow-x-auto bg-transparent p-0">{nav.map(([value,label,Icon]) => <TabsTrigger key={value} value={value} className="min-w-max rounded-xl px-3 py-2 data-[state=active]:bg-[#eee3f5] data-[state=active]:text-primary data-[state=active]:shadow-none"><Icon className="size-4" />{label}</TabsTrigger>)}</TabsList></div><div className="gentle-enter p-4 sm:p-6 lg:p-7">{view}</div></Tabs></div></main>;
}
