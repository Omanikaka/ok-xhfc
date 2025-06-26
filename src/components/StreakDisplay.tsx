
import { useTheme } from "@/hooks/useTheme";
import { useStorage } from "@/hooks/useStorage";

export const StreakDisplay = () => {
  const { isDark } = useTheme();
  const [streak, setStreak] = useStorage("daily-streak", 0);
  const [lastStudyDate, setLastStudyDate] = useStorage("last-study-date", "");

  // Check if today's date is different from last study date
  const today = new Date().toDateString();
  const shouldUpdateStreak = lastStudyDate !== today;

  const updateStreak = () => {
    if (shouldUpdateStreak) {
      setStreak(prev => prev + 1);
      setLastStudyDate(today);
    }
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${
      isDark ? "bg-black/50 border-yellow-400/20" : "bg-white border-gray-200"
    } shadow-lg text-center`}>
      <h2 className={`text-2xl font-bold mb-4 ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Study Streak
      </h2>
      
      <div className={`text-6xl font-bold mb-4 ${
        isDark ? "text-yellow-300" : "text-gray-700"
      }`}>
        {streak}
      </div>
      
      <p className={`text-lg ${
        isDark ? "text-yellow-400/70" : "text-gray-600"
      }`}>
        {streak === 0 ? "Start your journey!" : 
         streak === 1 ? "Day" : "Days"}
      </p>
      
      {shouldUpdateStreak && (
        <button
          onClick={updateStreak}
          className={`mt-4 px-4 py-2 rounded-lg ${
            isDark 
              ? "bg-yellow-400 text-black hover:bg-yellow-500" 
              : "bg-gray-800 text-white hover:bg-gray-900"
          } transition-colors`}
        >
          Mark Today Complete
        </button>
      )}
    </div>
  );
};
