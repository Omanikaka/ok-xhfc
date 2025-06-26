
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useStorage } from "@/hooks/useStorage";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, addDays, subDays } from "date-fns";
import { Button } from "@/components/ui/button";

export const StreakDisplay = () => {
  const { isDark } = useTheme();
  const [streak, setStreak] = useStorage("daily-streak", 0);
  const [lastStudyDate, setLastStudyDate] = useStorage("last-study-date", "");
  const [streakDates, setStreakDates] = useStorage("streak-dates", [] as string[]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Check if today's date is different from last study date
  const today = new Date().toDateString();
  const shouldUpdateStreak = lastStudyDate !== today;

  const updateStreak = () => {
    if (shouldUpdateStreak) {
      const newStreakDates = [...streakDates, today];
      setStreak(prev => prev + 1);
      setLastStudyDate(today);
      setStreakDates(newStreakDates);
    }
  };

  const goToNextDay = () => {
    const nextDay = addDays(new Date(), 1).toDateString();
    if (!streakDates.includes(nextDay)) {
      const newStreakDates = [...streakDates, nextDay];
      setStreak(prev => prev + 1);
      setLastStudyDate(nextDay);
      setStreakDates(newStreakDates);
    }
  };

  // Get days that have streaks for the calendar
  const getStreakDates = () => {
    return streakDates.map(dateStr => new Date(dateStr));
  };

  const modifiers = {
    streak: getStreakDates(),
  };

  const modifiersStyles = {
    streak: {
      backgroundColor: isDark ? '#facc15' : '#eab308',
      color: isDark ? '#000' : '#fff',
      fontWeight: 'bold',
    },
  };

  return (
    <div className={`p-6 rounded-xl border-2 backdrop-blur-lg ${
      isDark 
        ? "bg-black/30 border-yellow-400/30 shadow-2xl shadow-yellow-400/20" 
        : "bg-white/30 border-gray-200/30 shadow-2xl shadow-gray-400/20"
    }`}>
      <h2 className={`text-2xl font-bold mb-4 text-center ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Study Streak
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Streak Counter */}
        <div className="flex-1 text-center">
          <div className={`text-6xl font-bold mb-4 ${
            isDark ? "text-yellow-300" : "text-gray-700"
          }`}>
            {streak}
          </div>
          
          <p className={`text-lg mb-4 ${
            isDark ? "text-yellow-400/70" : "text-gray-600"
          }`}>
            {streak === 0 ? "Start your journey!" : 
             streak === 1 ? "Day" : "Days"}
          </p>
          
          <div className="space-y-2">
            {shouldUpdateStreak && (
              <Button
                onClick={updateStreak}
                className={`w-full backdrop-blur-sm transition-colors ${
                  isDark 
                    ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                    : "bg-gray-800 text-white hover:bg-gray-900"
                }`}
              >
                Mark Today Complete
              </Button>
            )}
            
            <Button
              onClick={goToNextDay}
              variant="outline"
              className={`w-full backdrop-blur-sm transition-colors ${
                isDark 
                  ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black" 
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Go to Next Day
            </Button>
          </div>
        </div>

        {/* Calendar */}
        <div className="flex-1">
          <div className={`rounded-lg p-4 backdrop-blur-sm ${
            isDark 
              ? "bg-black/20 border border-yellow-400/20" 
              : "bg-white/20 border border-gray-200/20"
          }`}>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className={`${isDark ? "text-yellow-400" : "text-gray-800"}`}
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: `text-sm font-medium ${isDark ? "text-yellow-400" : "text-gray-800"}`,
                nav: "space-x-1 flex items-center",
                nav_button: `h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 ${
                  isDark ? "text-yellow-400 hover:text-yellow-300" : "text-gray-800 hover:text-gray-600"
                }`,
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: `${isDark ? "text-yellow-400/70" : "text-gray-600"} rounded-md w-9 font-normal text-[0.8rem]`,
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                day: `h-9 w-9 p-0 font-normal ${isDark ? "text-yellow-400/80" : "text-gray-700"}`,
                day_selected: `${isDark ? "bg-yellow-400 text-black" : "bg-gray-800 text-white"}`,
                day_today: `${isDark ? "bg-yellow-400/20 text-yellow-300" : "bg-gray-200 text-gray-800"}`,
                day_outside: `${isDark ? "text-yellow-400/30" : "text-gray-400"} opacity-50`,
                day_disabled: `${isDark ? "text-yellow-400/30" : "text-gray-400"} opacity-50`,
              }}
            />
            
            <div className={`mt-4 text-center text-sm ${
              isDark ? "text-yellow-400/70" : "text-gray-600"
            }`}>
              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded ${
                  isDark ? "bg-yellow-400" : "bg-gray-800"
                }`}></div>
                <span>Study days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
