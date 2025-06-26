
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useStorage } from "@/hooks/useStorage";

const subjects = ["English", "Science", "SSC", "Hindi", "Malayalam", "Math"];

export const AcademicsTable = () => {
  const { isDark } = useTheme();
  const [dailyStudy, setDailyStudy] = useStorage("daily-study", {
    date: new Date().toDateString(),
    subjects: {
      English: false,
      Science: false,
      SSC: false,
      Hindi: false,
      Malayalam: false,
      Math: false,
    }
  });

  const today = new Date().toDateString();
  
  // Reset daily study if it's a new day
  if (dailyStudy.date !== today) {
    setDailyStudy({
      date: today,
      subjects: {
        English: false,
        Science: false,
        SSC: false,
        Hindi: false,
        Malayalam: false,
        Math: false,
      }
    });
  }

  const markStudied = (subject: string) => {
    setDailyStudy(prev => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [subject]: !prev.subjects[subject as keyof typeof prev.subjects]
      }
    }));
  };

  const studiedToday = Object.values(dailyStudy.subjects).filter(Boolean).length;

  return (
    <div className={`p-6 rounded-xl border-2 backdrop-blur-lg ${
      isDark 
        ? "bg-black/30 border-yellow-400/30 shadow-2xl shadow-yellow-400/20" 
        : "bg-white/30 border-gray-200/30 shadow-2xl shadow-gray-400/20"
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Daily Study Tracker
      </h2>
      
      <div className={`mb-4 text-center p-3 rounded-lg ${
        isDark ? "bg-yellow-400/20" : "bg-gray-100/50"
      }`}>
        <span className={`text-lg font-semibold ${
          isDark ? "text-yellow-300" : "text-gray-700"
        }`}>
          Studied Today: {studiedToday}/{subjects.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {subjects.map((subject) => {
          const studied = dailyStudy.subjects[subject as keyof typeof dailyStudy.subjects];
          
          return (
            <div
              key={subject}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                studied
                  ? isDark
                    ? "bg-yellow-400/20 border-yellow-400/50"
                    : "bg-green-50/80 border-green-200"
                  : isDark
                  ? "bg-gray-800/20 border-gray-600/30"
                  : "bg-gray-50/50 border-gray-200"
              }`}
            >
              <h3 className={`font-semibold mb-2 ${
                studied
                  ? isDark ? "text-yellow-300" : "text-green-700"
                  : isDark ? "text-gray-300" : "text-gray-600"
              }`}>
                {subject}
              </h3>
              
              <Button
                onClick={() => markStudied(subject)}
                variant={studied ? "default" : "outline"}
                className={`w-full ${
                  studied
                    ? isDark
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-green-600 text-white hover:bg-green-700"
                    : isDark
                    ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                } backdrop-blur-sm`}
              >
                {studied ? "✓ Studied" : "Mark Studied"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
