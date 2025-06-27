
import { Button } from "@/components/ui/button";
import { Settings, BookOpen, GraduationCap } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  const { isDark } = useTheme();

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BookOpen },
    { id: "academics", label: "Academics", icon: GraduationCap },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className={`border-b-2 ${
      isDark ? "border-yellow-400/20 bg-black/50" : "border-gray-200 bg-white/50"
    } backdrop-blur-sm sticky top-0 z-50`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-center space-x-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? "default" : "ghost"}
              onClick={() => setActiveTab(id)}
              className={`${
                activeTab === id
                  ? isDark
                    ? "bg-yellow-400 text-black hover:bg-yellow-500"
                    : "bg-gray-800 text-white hover:bg-gray-900"
                  : isDark
                  ? "text-yellow-400 hover:bg-yellow-400/10"
                  : "text-gray-600 hover:bg-gray-100"
              } transition-all duration-200`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};
