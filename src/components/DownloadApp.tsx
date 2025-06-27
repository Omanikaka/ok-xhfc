
import { useState } from "react";
import { Download, Smartphone, Monitor, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTheme } from "@/hooks/useTheme";

export const DownloadApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Install App
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Install Islamic Tracker
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Install this app on your device for the best experience and offline access.
          </p>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-4 h-4" />
                <h3 className="font-semibold">On Mobile (iOS/Android)</h3>
              </div>
              <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                <li>Open this website in Safari (iOS) or Chrome (Android)</li>
                <li>Tap the share button (iOS) or menu (Android)</li>
                <li>Select "Add to Home Screen"</li>
                <li>Tap "Add" to install</li>
              </ol>
            </div>
            
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="w-4 h-4" />
                <h3 className="font-semibold">On Desktop</h3>
              </div>
              <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                <li>Look for the install icon in your browser's address bar</li>
                <li>Click "Install Islamic Tracker"</li>
                <li>Or go to browser menu → "Install app"</li>
              </ol>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            The app will work offline once installed!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
