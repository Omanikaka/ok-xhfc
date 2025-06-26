
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "@/hooks/useTheme";
import { useStorage } from "@/hooks/useStorage";
import { Check } from "lucide-react";

const subjects = [
  { name: "Fiqh", totalChapters: 20 },
  { name: "Lisan ul Quran", totalChapters: 10 },
  { name: "Thareeqh", totalChapters: 17 },
  { name: "Duroos ul Ihsan", totalChapters: 14 },
];

export const StudyProgress = () => {
  const { isDark } = useTheme();
  const [progress, setProgress] = useStorage("study-progress", {
    "Fiqh": 0,
    "Lisan ul Quran": 0,
    "Thareeqh": 0,
    "Duroos ul Ihsan": 0,
  });

  const markComplete = (subject: string) => {
    const currentProgress = progress[subject as keyof typeof progress];
    const totalChapters = subjects.find(s => s.name === subject)?.totalChapters || 0;
    
    if (currentProgress < totalChapters) {
      setProgress(prev => ({
        ...prev,
        [subject]: currentProgress + 1
      }));
    }
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${
      isDark ? "bg-black/50 border-yellow-400/20" : "bg-white border-gray-200"
    } shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Study Progress
      </h2>
      
      <div className="space-y-4">
        {subjects.map((subject) => {
          const currentProgress = progress[subject.name as keyof typeof progress];
          const progressPercentage = (currentProgress / subject.totalChapters) * 100;
          const isComplete = currentProgress >= subject.totalChapters;
          
          return (
            <div key={subject.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`font-semibold ${
                  isDark ? "text-yellow-300" : "text-gray-700"
                }`}>
                  {subject.name}
                </span>
                <span className={`text-sm ${
                  isDark ? "text-yellow-400" : "text-gray-600"
                }`}>
                  {isComplete ? "Complete!" : `${currentProgress}/${subject.totalChapters}`}
                </span>
              </div>
              
              <Progress 
                value={progressPercentage} 
                className={`h-3 ${
                  isDark ? "bg-yellow-400/20" : "bg-gray-200"
                }`}
              />
              
              <div className="flex justify-between items-center">
                <span className={`text-xs ${
                  isDark ? "text-yellow-400/70" : "text-gray-500"
                }`}>
                  {isComplete ? "🎉 Completed!" : `Next: Chapter ${currentProgress + 1}`}
                </span>
                
                {!isComplete && (
                  <Button
                    size="sm"
                    onClick={() => markComplete(subject.name)}
                    className={`${
                      isDark 
                        ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                        : "bg-gray-800 text-white hover:bg-gray-900"
                    }`}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Complete
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
