import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { FunFact } from "@/components/FunFact";
import { DrivingTimeChart } from "@/components/DrivingTimeChart";
import { TimeOfDayChart } from "@/components/TimeOfDayChart";
import { Achievement } from "@/components/Achievement";
import { Warning } from "@/components/Warning";
import { TripCard } from "@/components/TripCard";
import { Route, Target, Flame } from "lucide-react";
import { DayValue, TimeBucket } from "@/types/api";
import { UITrip, Stat, FunFact as FunFactType, Warning as WarningType } from "@/types/ui";

const weekdayData: DayValue[] = [
  { day: "Mo", value: 2.5 },
  { day: "Di", value: 1.8 },
  { day: "Mi", value: 3.2 },
  { day: "Do", value: 2.1 },
  { day: "Fr", value: 4.5 },
  { day: "Sa", value: 1.2 },
  { day: "So", value: 0.8 },
];

const timeOfDayData: TimeBucket[] = [
  { label: "Morgens (6-10)", value: 35 },
  { label: "Mittags (10-14)", value: 15 },
  { label: "Nachmittags (14-18)", value: 30 },
  { label: "Abends (18-22)", value: 20 },
];

const achievements = [
  { achievement: { name: "1.000 km Club", achieved: true }, description: "Erste 1.000 km gefahren", icon: <Route className="w-5 h-5" /> },
  { achievement: { name: "Frühaufsteher", achieved: true }, description: "10 Fahrten vor 7 Uhr", icon: <Target className="w-5 h-5" /> },
  { achievement: { name: "Sparfuchs", achieved: false }, description: "Verbrauch unter 5L/100km", icon: <Flame className="w-5 h-5" /> },
];

const trips: UITrip[] = [
  {
    datum_uhrzeit_start: "2026-01-15 14:32",
    startLocation: "Berlin Mitte",
    endLocation: "Potsdam",
    km: 38.5,
    dauer: "42 min",
    avg_speed: "55",
  },
  {
    datum_uhrzeit_start: "2026-01-15 09:15",
    startLocation: "Zuhause",
    endLocation: "Büro",
    km: 12.3,
    dauer: "18 min",
    avg_speed: "41",
    context: "Arbeit",
  },
  {
    datum_uhrzeit_start: "2026-01-14 19:30",
    startLocation: "Büro",
    endLocation: "Restaurant",
    km: 5.2,
    dauer: "12 min",
    avg_speed: "26",
    context: "Geburtstagsfeier",
  },
  {
    datum_uhrzeit_start: "2026-01-14 08:45",
    startLocation: "Zuhause",
    endLocation: "Büro",
    km: 12.3,
    dauer: "22 min",
    avg_speed: "34",
    context: "Arbeit",
  },
];

const stats: Stat[] = [
    { label: "Gefahrene Strecke", value: "847", unit: "km" },
    { label: "Durchschnittstempo", value: "48", unit: "km/h" },
    { label: "Fahrzeit", value: "16,5", unit: "Std" },
    { label: "Fahrten", value: "23" },
];

const funFact: FunFactType = { text: "Du bist diesen Monat 847 km gefahren – das ist so weit wie von Berlin nach Amsterdam!" };

const warning: WarningType = { 
  title: "Starkes Bremsen erkannt", 
  description: "3 starke Bremsmanöver in den letzten Fahrten. Versuche vorausschauender zu fahren."
};

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentMonth="Januar 2026" />
      
      <main className="container mx-auto py-6">
        {/* Aggregierte Statistiken */}
        <section className="mb-8">
          <p className="section-title mb-3">Übersicht</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </section>

        {/* Fun Fact */}
        <section className="mb-8">
          <FunFact funFact={funFact} />
        </section>

        {/* Wann fährst du? */}
        <section className="mb-8">
          <p className="section-title mb-3">Wann fährst du?</p>
          <div className="grid lg:grid-cols-2 gap-3">
            <DrivingTimeChart data={weekdayData} title="Wochentage" />
            <TimeOfDayChart data={timeOfDayData} />
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-8">
          <p className="section-title mb-3">Achievements</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {achievements.map((achievement, index) => (
              <Achievement key={index} {...achievement} />
            ))}
          </div>
        </section>

        {/* Warnungen */}
        <section className="mb-8">
          <p className="section-title mb-3">Hinweise</p>
          <div className="space-y-3">
            <Warning warning={warning} />
          </div>
        </section>

        {/* Fahrtenbuch */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <p className="section-title">Letzte Fahrten</p>
            <button className="text-sm text-primary hover:underline">
              Alle anzeigen
            </button>
          </div>
          <div className="space-y-2">
            {trips.map((trip, index) => (
              <TripCard key={index} trip={trip} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
