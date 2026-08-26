"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Heart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AvatarId, Profile } from "@/lib/w-rytmie/types";

const avatars: { id: AvatarId; face: string; name: string; color: string }[] = [
  { id: "luna", face: "👩🏻", name: "Luna", color: "#d7c1ea" },
  { id: "violet", face: "👩🏼‍🦱", name: "Violet", color: "#c8a8df" },
  { id: "iris", face: "👩🏽", name: "Iris", color: "#b995d1" },
  { id: "nova", face: "👩🏾‍🦰", name: "Nova", color: "#a87bc7" },
];
const symptoms = ["Ból brzucha", "Ból pleców", "Zmęczenie", "Wzdęcia", "Migrena", "Zmiany nastroju", "Duży apetyt", "Problemy ze snem"];
type Props = { onComplete: (profile: Profile) => void };

export function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<AvatarId>("violet");
  const [birthYear, setBirthYear] = useState("2000");
  const [height, setHeight] = useState("165");
  const [weight, setWeight] = useState("60");
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().slice(0, 10));
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [goal, setGoal] = useState("Lepsze samopoczucie");
  const canContinue = useMemo(() => step !== 1 || name.trim().length >= 2, [name, step]);

  function finish() {
    onComplete({ name: name.trim(), avatar, birthYear: Number(birthYear), heightCm: Number(height), weightKg: Number(weight), lastPeriod, cycleLength: Number(cycleLength), periodLength: Number(periodLength), usualSymptoms: selectedSymptoms, primaryGoal: goal });
  }

  return <main className="soft-grid min-h-screen px-4 py-6 sm:px-8 sm:py-10"><div className="mx-auto max-w-5xl">
    <header className="mb-7 flex items-center justify-between"><div className="flex items-center gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-primary text-white shadow-sm"><Heart className="size-5" /></div><div><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">W RYTMIE</p><p className="text-sm text-muted-foreground">Poznajmy Twój rytm</p></div></div><span className="rounded-full border bg-white/80 px-3 py-1.5 text-xs text-muted-foreground">Krok {step} z 3</span></header>
    <Progress value={(step / 3) * 100} className="mb-8 h-1.5 bg-[#e8def0]" />
    <section className="gentle-enter grid overflow-hidden rounded-[2rem] border bg-card shadow-[0_24px_70px_rgba(84,55,110,.10)] lg:grid-cols-[.8fr_1.2fr]">
      <aside className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-[#6f4b9c] p-8 text-white lg:min-h-[590px]"><div className="absolute -right-12 top-24 size-48 rounded-full border border-white/15" /><div className="absolute -right-4 top-32 size-28 rounded-full border border-dashed border-white/25" /><div className="relative"><p className="mb-3 text-sm font-semibold text-[#eadff4]">Profil, który słucha</p><h1 className="max-w-sm text-3xl font-semibold leading-tight sm:text-4xl">Nie musisz czuć się tak samo każdego dnia.</h1><p className="mt-4 max-w-sm text-sm leading-6 text-[#eadff4]">Dopasujemy jedzenie, ruch, regenerację i małe cele do Twojego ciała — bez karania za słabszy dzień.</p></div><div className="relative mt-8 flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-sm text-[#f7f0fb]"><ShieldCheck className="size-5 shrink-0" />Dane tej wersji pozostają na Twoim urządzeniu.</div></aside>
      <div className="p-6 sm:p-10">
        {step === 1 && <div className="space-y-7"><div><p className="text-sm font-semibold text-primary">Zacznijmy od Ciebie</p><h2 className="mt-1 text-2xl font-semibold">Jak mamy się do Ciebie zwracać?</h2></div><label className="block space-y-2 text-sm font-medium">Imię lub pseudonim<Input value={name} onChange={(e) => setName(e.target.value)} placeholder="np. Natalia" className="h-12 rounded-xl bg-white" /></label><div><p className="mb-3 text-sm font-medium">Wybierz swój awatar</p><div className="grid grid-cols-4 gap-3">{avatars.map((item) => <button key={item.id} type="button" onClick={() => setAvatar(item.id)} aria-label={`Wybierz awatar ${item.name}`} className={`relative rounded-2xl border-2 p-3 transition ${avatar === item.id ? "border-primary bg-[#f0e6f7] shadow-sm" : "border-transparent bg-[#f7f1fa] hover:border-[#d7c4e6]"}`}><span className="mx-auto grid size-14 place-items-center rounded-full text-3xl" style={{ background: item.color }}>{item.face}</span><span className="mt-2 block text-xs font-semibold">{item.name}</span>{avatar === item.id && <span className="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-primary text-white"><Check className="size-3" /></span>}</button>)}</div></div><div className="grid gap-4 sm:grid-cols-3"><label className="space-y-2 text-sm font-medium">Rok urodzenia<Input type="number" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} /></label><label className="space-y-2 text-sm font-medium">Wzrost (cm)<Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} /></label><label className="space-y-2 text-sm font-medium">Masa (kg)<Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} /></label></div></div>}
        {step === 2 && <div className="space-y-7"><div><p className="text-sm font-semibold text-primary">Twój cykl</p><h2 className="mt-1 text-2xl font-semibold">Jak zwykle wygląda?</h2><p className="mt-2 text-sm text-muted-foreground">To są szacunki, nie pomiar hormonów. Zawsze będziemy pytać również o samopoczucie.</p></div><label className="block space-y-2 text-sm font-medium">Pierwszy dzień ostatniej miesiączki<Input type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} className="h-12 rounded-xl bg-white" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium">Typowa długość cyklu<Input type="number" min="18" max="60" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} /></label><label className="space-y-2 text-sm font-medium">Typowa długość miesiączki<Input type="number" min="1" max="14" value={periodLength} onChange={(e) => setPeriodLength(e.target.value)} /></label></div><div><p className="mb-3 text-sm font-medium">Co często odczuwasz?</p><div className="grid gap-3 sm:grid-cols-2">{symptoms.map((symptom) => <label key={symptom} className="flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 text-sm"><Checkbox checked={selectedSymptoms.includes(symptom)} onCheckedChange={(checked) => setSelectedSymptoms((current) => checked ? [...current, symptom] : current.filter((s) => s !== symptom))} />{symptom}</label>)}</div></div></div>}
        {step === 3 && <div className="space-y-7"><div><p className="text-sm font-semibold text-primary">Twój kierunek</p><h2 className="mt-1 text-2xl font-semibold">Co ma Ci dać aplikacja?</h2></div><label className="block space-y-2 text-sm font-medium">Najważniejszy cel<Select value={goal} onValueChange={setGoal}><SelectTrigger className="h-12 w-full rounded-xl bg-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Lepsze samopoczucie">Lepsze samopoczucie</SelectItem><SelectItem value="Mądry progres sportowy">Mądry progres sportowy</SelectItem><SelectItem value="Lepsze odżywianie">Lepsze odżywianie</SelectItem><SelectItem value="Zrozumienie cyklu">Zrozumienie cyklu</SelectItem><SelectItem value="Więcej łagodności">Więcej łagodności dla siebie</SelectItem></SelectContent></Select></label><div className="rounded-2xl bg-[#f1e9f7] p-5"><p className="font-semibold">Twój profil będzie łączył:</p><div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">{["Cykl i objawy", "Jedzenie i makro", "Trening i codzienny ruch", "Journaling i wsparcie", "Recovery", "Małe sukcesy"].map((item) => <div key={item} className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full bg-white text-primary"><Check className="size-3" /></span>{item}</div>)}</div></div></div>}
        <div className="mt-10 flex items-center justify-between border-t pt-5"><Button variant="ghost" disabled={step === 1} onClick={() => setStep((s) => s - 1)}><ArrowLeft /> Wstecz</Button>{step < 3 ? <Button disabled={!canContinue} onClick={() => setStep((s) => s + 1)} className="h-11 rounded-xl px-5">Dalej <ArrowRight /></Button> : <Button onClick={finish} className="h-11 rounded-xl px-5">Utwórz mój profil <Heart /></Button>}</div>
      </div>
    </section>
  </div></main>;
}
