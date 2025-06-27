
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
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <OfflineIndicator />
      <Header />
      
      {/* Navigation Tabs */}
      <div className={`sticky top-16 z-30 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        isDark ? "bg-gray-900/80" : "bg-white/80"
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              onClick={() => setActiveTab("dashboard")}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Dashboard
            </Button>
            <Button
              variant={activeTab === "academics" ? "default" : "ghost"}
              onClick={() => setActiveTab("academics")}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Academics
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              onClick={() => setActiveTab("settings")}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
      
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
