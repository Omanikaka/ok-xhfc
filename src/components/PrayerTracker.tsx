
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

  const incrementPrayer = (prayer: string) => {
    setPrayerCounts(prev => ({
      ...prev,
      [prayer]: prev[prayer as keyof typeof prev] + 1
    }));
  };

  const resetPrayers = () => {
    setPrayerCounts({
      Fajr: 0,
      Dhuhr: 0,
      Asr: 0,
      Maghrib: 0,
      Isha: 0,
    });
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${
      isDark ? "bg-black/50 border-yellow-400/20" : "bg-white border-gray-200"
    } shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Prayer Tracker
      </h2>
      
      <div className="space-y-4">
        {prayers.map((prayer) => (
          <div key={prayer} className="flex justify-between items-center">
            <span className={`font-semibold ${
              isDark ? "text-yellow-300" : "text-gray-700"
            }`}>
              {prayer}
            </span>
            
            <div className="flex items-center space-x-3">
              <span className={`text-lg font-bold ${
                isDark ? "text-yellow-400" : "text-gray-800"
              }`}>
                {prayerCounts[prayer as keyof typeof prayerCounts]}
              </span>
              
              <Button
                size="sm"
                onClick={() => incrementPrayer(prayer)}
                className={`${
                  isDark 
                    ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                    : "bg-gray-800 text-white hover:bg-gray-900"
                }`}
              >
                +1
              </Button>
            </div>
          </div>
        ))}
        
        <Button
          variant="outline"
          onClick={resetPrayers}
          className={`w-full mt-4 ${
            isDark 
              ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black" 
              : "border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          Reset Daily Count
        </Button>
      </div>
    </div>
  );
};
