
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { SpinWheel } from "@/components/SpinWheel";
import { StudyProgress } from "@/components/StudyProgress";
import { PrayerTracker } from "@/components/PrayerTracker";
import { WorkoutTracker } from "@/components/WorkoutTracker";
import { AcademicsTable } from "@/components/AcademicsTable";
import { StreakDisplay } from "@/components/StreakDisplay";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { Settings } from "@/components/Settings";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-black via-gray-900 to-black text-yellow-400" 
        : "bg-gradient-to-br from-white via-gray-50 to-white text-gray-800"
    }`}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className={`text-4xl font-bold mb-2 ${
                isDark ? "text-yellow-400" : "text-gray-800"
              }`}>
                Islamic Tracker
              </h1>
              <p className={`text-sm ${
                isDark ? "text-yellow-300/70" : "text-gray-600"
              }`}>
                Omanikaka Studios x Himaar fc x Islamic Tracker
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <SpinWheel />
                <StreakDisplay />
              </div>
              
              <div className="space-y-6">
                <StudyProgress />
                <BadgeDisplay />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <PrayerTracker />
              <WorkoutTracker />
            </div>
          </div>
        )}

        {activeTab === "academics" && <AcademicsTable />}
        {activeTab === "settings" && <Settings />}
      </main>

      <Toaster />
    </div>
  );
};

export default Index;
