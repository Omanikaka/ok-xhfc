
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/useTheme";
import { useStorage } from "@/hooks/useStorage";

export const WorkoutTracker = () => {
  const { isDark } = useTheme();
  const [workouts, setWorkouts] = useStorage("workouts", [] as string[]);
  const [newWorkout, setNewWorkout] = useState("");

  const addWorkout = () => {
    if (newWorkout.trim()) {
      setWorkouts(prev => [...prev, `${new Date().toLocaleDateString()}: ${newWorkout.trim()}`]);
      setNewWorkout("");
    }
  };

  const clearWorkouts = () => {
    setWorkouts([]);
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${
      isDark ? "bg-black/50 border-yellow-400/20" : "bg-white border-gray-200"
    } shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Workout Tracker
      </h2>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter workout..."
            value={newWorkout}
            onChange={(e) => setNewWorkout(e.target.value)}
            className={`flex-1 ${
              isDark 
                ? "bg-black/50 border-yellow-400/30 text-yellow-300 placeholder:text-yellow-400/50" 
                : "bg-white border-gray-300 text-gray-800"
            }`}
            onKeyPress={(e) => e.key === 'Enter' && addWorkout()}
          />
          <Button
            onClick={addWorkout}
            className={`${
              isDark 
                ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                : "bg-gray-800 text-white hover:bg-gray-900"
            }`}
          >
            Add
          </Button>
        </div>
        
        <div className="max-h-40 overflow-y-auto space-y-2">
          {workouts.map((workout, index) => (
            <div
              key={index}
              className={`p-2 rounded border ${
                isDark 
                  ? "bg-yellow-400/10 border-yellow-400/20 text-yellow-300" 
                  : "bg-gray-50 border-gray-200 text-gray-700"
              }`}
            >
              {workout}
            </div>
          ))}
        </div>
        
        {workouts.length > 0 && (
          <Button
            variant="outline"
            onClick={clearWorkouts}
            className={`w-full ${
              isDark 
                ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black" 
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Clear History
          </Button>
        )}
        
        <div className={`text-center text-sm ${
          isDark ? "text-yellow-400/70" : "text-gray-500"
        }`}>
          Total workouts: {workouts.length}
        </div>
      </div>
    </div>
  );
};
