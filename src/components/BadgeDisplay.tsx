
import { useTheme } from "@/hooks/useTheme";
import { useStorage } from "@/hooks/useStorage";

export const BadgeDisplay = () => {
  const { isDark } = useTheme();
  const [streak] = useStorage("daily-streak", 0);
  const [progress] = useStorage("study-progress", {
    "Fiqh": 0,
    "Lisan ul Quran": 0,
    "Thareeqh": 0,
    "Duroos ul Ihsan": 0,
  });

  const badges = [
    {
      name: "First Steps",
      description: "Complete your first chapter",
      earned: Object.values(progress).some(p => p > 0),
      icon: "🚀"
    },
    {
      name: "Dedicated Student",
      description: "Maintain a 7-day streak",
      earned: streak >= 7,
      icon: "📚"
    },
    {
      name: "Scholar",
      description: "Complete any subject",
      earned: Object.entries(progress).some(([key, value]) => {
        const totalChapters = key === "Fiqh" ? 20 : key === "Lisan ul Quran" ? 10 : key === "Thareeqh" ? 17 : 14;
        return value >= totalChapters;
      }),
      icon: "🎓"
    },
    {
      name: "Consistency Champion",
      description: "Maintain a 30-day streak",
      earned: streak >= 30,
      icon: "🏆"
    }
  ];

  const earnedBadges = badges.filter(badge => badge.earned);

  return (
    <div className={`p-6 rounded-xl border-2 ${
      isDark ? "bg-black/50 border-yellow-400/20" : "bg-white border-gray-200"
    } shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Badges ({earnedBadges.length}/{badges.length})
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.name}
            className={`p-4 rounded-lg border-2 text-center ${
              badge.earned
                ? isDark
                  ? "bg-yellow-400/20 border-yellow-400/50"
                  : "bg-yellow-50 border-yellow-200"
                : isDark
                ? "bg-gray-800/20 border-gray-600/30"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className={`text-2xl mb-2 ${
              badge.earned ? "" : "grayscale opacity-50"
            }`}>
              {badge.icon}
            </div>
            <h3 className={`font-semibold text-sm mb-1 ${
              badge.earned
                ? isDark ? "text-yellow-300" : "text-gray-800"
                : isDark ? "text-gray-500" : "text-gray-400"
            }`}>
              {badge.name}
            </h3>
            <p className={`text-xs ${
              badge.earned
                ? isDark ? "text-yellow-400/70" : "text-gray-600"
                : isDark ? "text-gray-600" : "text-gray-400"
            }`}>
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
