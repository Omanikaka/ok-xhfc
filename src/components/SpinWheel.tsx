
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/use-toast";

const subjects = [
  { name: "Fiqh", chapters: 20, color: "#FFD700" },
  { name: "Lisan ul Quran", chapters: 10, color: "#FFA500" },
  { name: "Thareeqh", chapters: 17, color: "#FF8C00" },
  { name: "Duroos ul Ihsan", chapters: 14, color: "#FF6347" },
];

export const SpinWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [rotation, setRotation] = useState(0);
  const { isDark } = useTheme();
  const { toast } = useToast();

  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    const randomRotation = Math.random() * 360 + 1440; // At least 4 full spins
    setRotation(prev => prev + randomRotation);
    
    setTimeout(() => {
      const finalAngle = randomRotation % 360;
      const sectionAngle = 360 / subjects.length;
      const selectedIndex = Math.floor((360 - finalAngle) / sectionAngle) % subjects.length;
      const subject = subjects[selectedIndex];
      
      setSelectedSubject(subject.name);
      setSpinning(false);
      
      toast({
        title: "Today's Subject",
        description: `Study ${subject.name} today!`,
      });
    }, 3000);
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${
      isDark ? "bg-black/50 border-yellow-400/20" : "bg-white border-gray-200"
    } shadow-lg`}>
      <h2 className={`text-2xl font-bold text-center mb-6 ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Subject Wheel
      </h2>
      
      <div className="relative w-64 h-64 mx-auto mb-6">
        <div 
          className="w-full h-full rounded-full border-4 border-yellow-400 relative overflow-hidden transition-transform duration-3000 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {subjects.map((subject, index) => {
            const angle = (360 / subjects.length) * index;
            return (
              <div
                key={subject.name}
                className="absolute inset-0 flex items-center justify-center text-black font-bold text-sm"
                style={{
                  background: `conic-gradient(from ${angle}deg, ${subject.color} 0deg, ${subject.color} ${360/subjects.length}deg, transparent ${360/subjects.length}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle + 360/subjects.length) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle + 360/subjects.length) * Math.PI / 180)}%, ${50 + 50 * Math.cos(angle * Math.PI / 180)}% ${50 + 50 * Math.sin(angle * Math.PI / 180)}%)`,
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <span className="transform -rotate-45 text-xs p-2">
                  {subject.name}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className={`w-0 h-0 border-l-4 border-r-4 border-b-8 ${
            isDark ? "border-l-transparent border-r-transparent border-b-yellow-400" : "border-l-transparent border-r-transparent border-b-gray-800"
          }`}></div>
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={spinWheel}
          disabled={spinning}
          className={`${
            isDark 
              ? "bg-yellow-400 text-black hover:bg-yellow-500" 
              : "bg-gray-800 text-white hover:bg-gray-900"
          } px-8 py-3 text-lg font-semibold`}
        >
          {spinning ? "Spinning..." : "Spin the Wheel!"}
        </Button>
        
        {selectedSubject && (
          <p className={`mt-4 text-lg font-semibold ${
            isDark ? "text-yellow-300" : "text-gray-700"
          }`}>
            Today: {selectedSubject}
          </p>
        )}
      </div>
    </div>
  );
};
