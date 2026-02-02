import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { FunFact } from "@/components/FunFact";
import { DrivingTimeChart } from "@/components/DrivingTimeChart";
import { TimeOfDayChart } from "@/components/TimeOfDayChart";
import { Achievement } from "@/components/Achievement";
import { Warning } from "@/components/Warning";
import { TripCard } from "@/components/TripCard";
import { Route, Target, Flame } from "lucide-react";
import { getVehicleStats, getVehicleAnalysis, getAchievements, getTrips } from "@/lib/api";
import { VehicleStats, VehicleAnalysis, Achievement as ApiAchievement, Trip, SafetyEvent } from "@/types/api";
import { UITrip, Stat, FunFact as FunFactType, Warning as WarningType } from "@/types/ui";

const achievementDetails: { [key: string]: { description: string; icon: React.ReactNode } } = {
  "1.000 km Club": { description: "Erste 1.000 km gefahren", icon: <Route className="w-5 h-5" /> },
  "Frühaufsteher": { description: "10 Fahrten vor 7 Uhr", icon: <Target className="w-5 h-5" /> },
  "Sparfuchs": { description: "Verbrauch unter 5L/100km", icon: <Flame className="w-5 h-5" /> },
};

// TODO: remove locations
const mapTripToUITrip = (trip: Trip): UITrip => {
  // This is a placeholder for a real location lookup based on coordinates
  const locations = ["Berlin", "Potsdam", "Hamburg", "München"];
  return {
    ...trip,
    startLocation: locations[Math.floor(Math.random() * locations.length)],
    endLocation: locations[Math.floor(Math.random() * locations.length)],
    context: trip.tag,
  };
};

export default function Index() {
  const [stats, setStats] = useState<VehicleStats | null>(null);
  const [analysis, setAnalysis] = useState<VehicleAnalysis | null>(null);
  const [achievements, setAchievements] = useState<ApiAchievement[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsData, analysisData, achievementsData, tripsData] = await Promise.all([
          getVehicleStats(),
          getVehicleAnalysis(),
          getAchievements(),
          getTrips(),
        ]);
        setStats(statsData);
        setAnalysis(analysisData);
        setAchievements(achievementsData);
        setTrips(tripsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error state in UI
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards: Stat[] = [
    { label: "Gefahrene Strecke", value: stats?.total_km?.toString() ?? '0', unit: "km" },
    { label: "Durchschnittstempo", value: stats?.avg_speed?.toString() ?? '0', unit: "km/h" },
    { label: "Fahrzeit", value: stats?.total_drive_time_minutes ? (stats.total_drive_time_minutes / 60).toFixed(1) : '0', unit: "Std" },
    { label: "Fahrten", value: stats?.trip_count?.toString() ?? '0' },
  ];

  const funFact: FunFactType | null = stats?.total_km ? { text: `Du bist diesen Monat ${stats.total_km} km gefahren – das ist so weit wie von Berlin nach Amsterdam!` } : null;

  const warnings: WarningType[] = analysis?.safety_events?.map(event => ({
    title: event.type === 'HARD_BRAKE' ? "Starkes Bremsen erkannt" : "Starke Beschleunigung",
    description: `Am ${new Date(event.timestamp!).toLocaleString()}. Versuche vorausschauender zu fahren.`
  })) ?? [];

  const uiTrips: UITrip[] = trips.map(mapTripToUITrip);
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentMonth="Januar 2026" />
      
      <main className="container mx-auto py-6">
        <section className="mb-8">
          <p className="section-title mb-3">Übersicht</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {statCards.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </section>

        {funFact && (
          <section className="mb-8">
            <FunFact funFact={funFact} />
          </section>
        )}

        {analysis && (
          <section className="mb-8">
            <p className="section-title mb-3">Wann fährst du?</p>
            <div className="grid lg:grid-cols-2 gap-3">
              <DrivingTimeChart data={analysis.weekday_usage ?? []} title="Wochentage" />
              <TimeOfDayChart data={analysis.time_of_day_usage ?? []} />
            </div>
          </section>
        )}

        <section className="mb-8">
          <p className="section-title mb-3">Achievements</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {achievements.map((achievement) => (
              <Achievement 
                key={achievement.name}
                achievement={achievement} 
                description={achievementDetails[achievement.name!]?.description ?? ''}
                icon={achievementDetails[achievement.name!]?.icon}
              />
            ))}
          </div>
        </section>

        {warnings.length > 0 && (
          <section className="mb-8">
            <p className="section-title mb-3">Hinweise</p>
            <div className="space-y-3">
              {warnings.map((warning, index) => (
                <Warning key={index} warning={warning} />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-3">
            <p className="section-title">Letzte Fahrten</p>
            <button className="text-sm text-primary hover:underline">
              Alle anzeigen
            </button>
          </div>
          <div className="space-y-2">
            {uiTrips.map((trip) => (
              <TripCard key={trip.trip_id} trip={trip} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
