
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
    <div className={`p-6 rounded-xl border-2 backdrop-blur-lg ${
      isDark 
        ? "bg-black/30 border-yellow-400/30 shadow-2xl shadow-yellow-400/20" 
        : "bg-white/30 border-gray-200/30 shadow-2xl shadow-gray-400/20"
    }`}>
      <h2 className={`text-2xl font-bold text-center mb-6 ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Subject Wheel
      </h2>
      
      <div className="relative w-64 h-64 mx-auto mb-6">
        <svg 
          className="w-full h-full transition-transform duration-3000 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
          viewBox="0 0 200 200"
        >
          {subjects.map((subject, index) => {
            const angle = (360 / subjects.length) * index;
            const nextAngle = (360 / subjects.length) * (index + 1);
            
            // Calculate path for each slice
            const startAngle = (angle - 90) * (Math.PI / 180);
            const endAngle = (nextAngle - 90) * (Math.PI / 180);
            
            const x1 = 100 + 90 * Math.cos(startAngle);
            const y1 = 100 + 90 * Math.sin(startAngle);
            const x2 = 100 + 90 * Math.cos(endAngle);
            const y2 = 100 + 90 * Math.sin(endAngle);
            
            const largeArcFlag = nextAngle - angle > 180 ? 1 : 0;
            
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');
            
            // Calculate text position
            const textAngle = (angle + nextAngle) / 2;
            const textAngleRad = (textAngle - 90) * (Math.PI / 180);
            const textX = 100 + 60 * Math.cos(textAngleRad);
            const textY = 100 + 60 * Math.sin(textAngleRad);
            
            return (
              <g key={subject.name}>
                <path
                  d={pathData}
                  fill={subject.color}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text
                  x={textX}
                  y={textY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-bold fill-black"
                  transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                >
                  {subject.name}
                </text>
              </g>
            );
          })}
          
          {/* Center circle */}
          <circle cx="100" cy="100" r="15" fill="#fff" stroke="#333" strokeWidth="2" />
        </svg>
        
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
          } px-8 py-3 text-lg font-semibold backdrop-blur-sm`}
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
