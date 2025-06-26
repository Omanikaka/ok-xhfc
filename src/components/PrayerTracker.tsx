
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useStorage } from "@/hooks/useStorage";

const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export const PrayerTracker = () => {
  const { isDark } = useTheme();
  const [prayerCounts, setPrayerCounts] = useStorage("prayer-counts", {
    Fajr: 0,
    Dhuhr: 0,
    Asr: 0,
    Maghrib: 0,
    Isha: 0,
  });
  
  const [dailyPrayers, setDailyPrayers] = useStorage("daily-prayers", {
    date: new Date().toDateString(),
    prayers: {
      Fajr: false,
      Dhuhr: false,
      Asr: false,
      Maghrib: false,
      Isha: false,
    }
  });

  const today = new Date().toDateString();
  
  // Reset daily prayers if it's a new day
  if (dailyPrayers.date !== today) {
    setDailyPrayers({
      date: today,
      prayers: {
        Fajr: false,
        Dhuhr: false,
        Asr: false,
        Maghrib: false,
        Isha: false,
      }
    });
  }

  const markPrayer = (prayer: string) => {
    if (dailyPrayers.prayers[prayer as keyof typeof dailyPrayers.prayers]) {
      return; // Already prayed today
    }
    
    // Mark as prayed today
    setDailyPrayers(prev => ({
      ...prev,
      prayers: {
        ...prev.prayers,
        [prayer]: true
      }
    }));
    
    // Increment total count
    setPrayerCounts(prev => ({
      ...prev,
      [prayer]: prev[prayer as keyof typeof prev] + 1
    }));
  };

  return (
    <div className={`p-6 rounded-xl border-2 backdrop-blur-lg ${
      isDark 
        ? "bg-black/30 border-yellow-400/30 shadow-2xl shadow-yellow-400/20" 
        : "bg-white/30 border-gray-200/30 shadow-2xl shadow-gray-400/20"
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Prayer Tracker
      </h2>
      
      <div className="space-y-4">
        {prayers.map((prayer) => {
          const prayedToday = dailyPrayers.prayers[prayer as keyof typeof dailyPrayers.prayers];
          const totalCount = prayerCounts[prayer as keyof typeof prayerCounts];
          
          return (
            <div key={prayer} className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className={`font-semibold ${
                  isDark ? "text-yellow-300" : "text-gray-700"
                }`}>
                  {prayer}
                </span>
                <span className={`text-sm ${
                  isDark ? "text-yellow-400/70" : "text-gray-500"
                }`}>
                  Total: {totalCount}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                {prayedToday ? (
                  <span className={`text-lg font-bold ${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}>
                    ✓ Done
                  </span>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => markPrayer(prayer)}
                    className={`${
                      isDark 
                        ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                        : "bg-gray-800 text-white hover:bg-gray-900"
                    } backdrop-blur-sm`}
                  >
                    Mark Done
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
