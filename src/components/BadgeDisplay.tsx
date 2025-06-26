
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
  const [prayerCounts] = useStorage("prayer-counts", {
    Fajr: 0,
    Dhuhr: 0,
    Asr: 0,
    Maghrib: 0,
    Isha: 0,
  });

  const totalPrayers = Object.values(prayerCounts).reduce((sum, count) => sum + count, 0);
  const completedSubjects = Object.entries(progress).filter(([key, value]) => {
    const totalChapters = key === "Fiqh" ? 20 : key === "Lisan ul Quran" ? 10 : key === "Thareeqh" ? 17 : 14;
    return value >= totalChapters;
  }).length;

  const badges = [
    {
      name: "First Steps",
      description: "Complete your first chapter",
      earned: Object.values(progress).some(p => p > 0),
      icon: "🚀"
    },
    {
      name: "Prayer Warrior",
      description: "Complete 50 prayers",
      earned: totalPrayers >= 50,
      icon: "🕌"
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
      earned: completedSubjects > 0,
      icon: "🎓"
    },
    {
      name: "Consistency Champion",
      description: "Maintain a 30-day streak",
      earned: streak >= 30,
      icon: "🏆"
    },
    {
      name: "Prayer Master",
      description: "Complete 200 prayers",
      earned: totalPrayers >= 200,
      icon: "⭐"
    },
    {
      name: "Knowledge Seeker",
      description: "Complete 2 subjects",
      earned: completedSubjects >= 2,
      icon: "📖"
    },
    {
      name: "Devotion Expert",
      description: "Maintain a 100-day streak",
      earned: streak >= 100,
      icon: "💎"
    },
    {
      name: "Islamic Scholar",
      description: "Complete all subjects",
      earned: completedSubjects >= 4,
      icon: "🌟"
    }
  ];

  const earnedBadges = badges.filter(badge => badge.earned);

  return (
    <div className={`p-6 rounded-xl border-2 backdrop-blur-lg ${
      isDark 
        ? "bg-black/30 border-yellow-400/30 shadow-2xl shadow-yellow-400/20" 
        : "bg-white/30 border-gray-200/30 shadow-2xl shadow-gray-400/20"
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Badges ({earnedBadges.length}/{badges.length})
      </h2>
      
      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.name}
            className={`p-3 rounded-lg border-2 text-center transition-all ${
              badge.earned
                ? isDark
                  ? "bg-yellow-400/20 border-yellow-400/50 transform hover:scale-105"
                  : "bg-yellow-50/80 border-yellow-200 transform hover:scale-105"
                : isDark
                ? "bg-gray-800/20 border-gray-600/30"
                : "bg-gray-50/50 border-gray-200"
            }`}
          >
            <div className={`text-xl mb-1 ${
              badge.earned ? "" : "grayscale opacity-50"
            }`}>
              {badge.icon}
            </div>
            <h3 className={`font-semibold text-xs mb-1 ${
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
