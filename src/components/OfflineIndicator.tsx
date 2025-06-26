
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { useTheme } from "@/hooks/useTheme";
import { WifiOff } from "lucide-react";

export const OfflineIndicator = () => {
  const isOnline = useOfflineStatus();
  const { isDark } = useTheme();

  if (isOnline) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 p-2 text-center backdrop-blur-sm ${
      isDark ? "bg-red-900/80 text-red-200" : "bg-red-600/90 text-white"
    }`}>
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="w-4 h-4" />
        <span className="text-sm font-medium">You're offline - Changes will sync when reconnected</span>
      </div>
    </div>
  );
};
