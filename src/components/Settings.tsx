
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export const Settings = () => {
  const { isDark, toggleTheme } = useTheme();

  const resetAllData = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
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
        Settings
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className={`text-lg font-semibold mb-3 ${
            isDark ? "text-yellow-300" : "text-gray-700"
          }`}>
            Appearance
          </h3>
          <div className="flex items-center justify-between">
            <span className={isDark ? "text-yellow-400/70" : "text-gray-600"}>
              Current theme: {isDark ? "Dark Mode (Black & Gold)" : "Light Mode (Yellow & White)"}
            </span>
            <Button
              onClick={toggleTheme}
              className={`backdrop-blur-sm ${
                isDark 
                  ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                  : "bg-gray-800 text-white hover:bg-gray-900"
              }`}
            >
              Switch to {isDark ? "Light" : "Dark"} Mode
            </Button>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-semibold mb-3 ${
            isDark ? "text-yellow-300" : "text-gray-700"
          }`}>
            Data Management
          </h3>
          <div className="space-y-3">
            <p className={`text-sm ${
              isDark ? "text-yellow-400/70" : "text-gray-600"
            }`}>
              Reset all progress, streaks, and stored data.
            </p>
            <Button
              onClick={resetAllData}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white backdrop-blur-sm"
            >
              Reset All Data
            </Button>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-semibold mb-3 ${
            isDark ? "text-yellow-300" : "text-gray-700"
          }`}>
            About
          </h3>
          <div className={`text-sm space-y-2 ${
            isDark ? "text-yellow-400/70" : "text-gray-600"
          }`}>
            <p><strong>Islamic Tracker</strong></p>
            <p>Created by: Omanikaka Studios x Himaar fc</p>
            <p>Version: 1.0.0</p>
            <p>Track your Islamic studies, prayers, and academic progress.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
