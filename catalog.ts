export const activityCatalog = [
  { id: "windows", name: "Mycie okien", category: "daily" as const, met: 3.3, muscles: ["barki", "ramiona", "przedramiona", "górne plecy", "core", "nogi"], note: "Ruch funkcjonalny: sięganie, pchanie, przyciąganie i stanie." },
  { id: "vacuum", name: "Odkurzanie", category: "daily" as const, met: 3.3, muscles: ["barki", "plecy", "ramiona", "core", "nogi"], note: "Codzienna aktywność całego ciała." },
  { id: "shopping", name: "Zakupy i noszenie toreb", category: "daily" as const, met: 3.5, muscles: ["chwyt", "przedramiona", "biceps", "barki", "core", "nogi"], note: "Ruch, chód i przenoszenie obciążenia." },
  { id: "walk", name: "Spokojny spacer", category: "recovery" as const, met: 3.0, muscles: ["nogi", "pośladki", "łydki", "core"], note: "Łagodny ruch i chwila oddechu." },
  { id: "stretch", name: "Rozciąganie / mobility", category: "recovery" as const, met: 2.3, muscles: ["biodra", "plecy", "nogi", "barki"], note: "Mobilność i rozluźnienie, dopasowane do objawów." },
  { id: "run", name: "Bieganie", category: "training" as const, met: 8.0, muscles: ["nogi", "pośladki", "łydki", "core"], note: "Trening wydolnościowy." },
  { id: "tennis", name: "Tenis", category: "training" as const, met: 7.3, muscles: ["nogi", "pośladki", "core", "barki", "ramiona", "plecy"], note: "Ruch wielokierunkowy, rotacja i praca całego ciała." },
  { id: "gym", name: "Trening siłowy", category: "training" as const, met: 5.0, muscles: ["całe ciało — zależnie od ćwiczeń"], note: "Dodaj odczuwany wysiłek, żeby lepiej ocenić obciążenie." },
];

export const nutrientFocus = {
  Menstruacja: { title: "Żelazo + witamina C", foods: "jajka, mięso, soczewica, fasola, pestki dyni + papryka, kiwi albo pomarańcza", why: "Przy krwawieniu warto regularnie dbać o źródła żelaza. Suplement dopiero po konsultacji lub badaniach." },
  "Faza folikularna": { title: "Węglowodany do działania", foods: "owsianka, ryż, pieczywo, ziemniaki, owoce", why: "Jeśli energia wraca i planujesz mocniejszy ruch, odpowiednia ilość paliwa pomaga wykonać go jakościowo." },
  "Okolice owulacji": { title: "Pełne paliwo + nawodnienie", foods: "pełny posiłek z węglowodanami, białkiem i kolorowymi warzywami", why: "Nie trzeba specjalnego suplementu dla tej fazy. Najważniejsze jest regularne jedzenie i reakcja na samopoczucie." },
  "Faza lutealna": { title: "Magnez, wapń i sycąca przekąska", foods: "kakao, pestki dyni, migdały, nabiał, banan, ciecierzyca", why: "Większy apetyt przed okresem może być realny. Warto zaplanować posiłek zamiast walczyć z głodem." },
};
