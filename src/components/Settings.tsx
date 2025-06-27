import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { exportDataAsPDF, importData } from "@/utils/dataManager";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [importText, setImportText] = useState("");
  const [showImportDialog, setShowImportDialog] = useState(false);

  const resetAllData = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleExportData = () => {
    exportDataAsPDF();
  };

  const handleImportData = () => {
    if (importText.trim()) {
      const success = importData(importText);
      if (success) {
        alert("Data imported successfully! The page will reload to apply changes.");
        window.location.reload();
      } else {
        alert("Failed to import data. Please check the format and try again.");
      }
    }
  };

  return (
    <div className={`p-6 rounded-xl border-2 backdrop-blur-lg ${
      isDark 
        ? "bg-black/30 border-yellow-400/30 shadow-2xl shadow-yellow-400/20" 
        : "bg-white/30 border-gray-200/30 shadow-2xl shadow-gray-400/20"
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Settings
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className={`text-lg font-semibold mb-3 ${
            isDark ? "text-yellow-300" : "text-gray-700"
          }`}>
            Appearance
          </h3>
          <div className="flex items-center justify-between">
            <span className={isDark ? "text-yellow-400/70" : "text-gray-600"}>
              Current theme: {isDark ? "Dark Mode (Black & Gold)" : "Light Mode (Yellow & White)"}
            </span>
            <Button
              onClick={toggleTheme}
              className={`backdrop-blur-sm ${
                isDark 
                  ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                  : "bg-gray-800 text-white hover:bg-gray-900"
              }`}
            >
              Switch to {isDark ? "Light" : "Dark"} Mode
            </Button>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-semibold mb-3 ${
            isDark ? "text-yellow-300" : "text-gray-700"
          }`}>
            Data Management
          </h3>
          <div className="space-y-3">
            <div>
              <p className={`text-sm mb-2 ${
                isDark ? "text-yellow-400/70" : "text-gray-600"
              }`}>
                Export your data as PDF for backup or device transfer.
              </p>
              <Button
                onClick={handleExportData}
                className={`backdrop-blur-sm ${
                  isDark 
                    ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                    : "bg-gray-800 text-white hover:bg-gray-900"
                }`}
              >
                Download Data as PDF
              </Button>
            </div>
            
            <div>
              <p className={`text-sm mb-2 ${
                isDark ? "text-yellow-400/70" : "text-gray-600"
              }`}>
                Import data from a previous export.
              </p>
              <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className={`backdrop-blur-sm ${
                      isDark 
                        ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black" 
                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Import Data
                  </Button>
                </DialogTrigger>
                <DialogContent className={`${
                  isDark ? "bg-black/90 border-yellow-400/30" : "bg-white/90 border-gray-200"
                }`}>
                  <DialogHeader>
                    <DialogTitle className={isDark ? "text-yellow-400" : "text-gray-800"}>
                      Import Data
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className={`text-sm ${
                      isDark ? "text-yellow-400/70" : "text-gray-600"
                    }`}>
                      Paste the JSON data from your exported PDF:
                    </p>
                    <textarea
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      placeholder="Paste your exported data here..."
                      className={`w-full h-32 p-3 rounded border ${
                        isDark 
                          ? "bg-black/50 border-yellow-400/30 text-yellow-400" 
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleImportData}
                        disabled={!importText.trim()}
                        className={`backdrop-blur-sm ${
                          isDark 
                            ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                            : "bg-gray-800 text-white hover:bg-gray-900"
                        }`}
                      >
                        Import
                      </Button>
                      <Button
                        onClick={() => setShowImportDialog(false)}
                        variant="outline"
                        className={`backdrop-blur-sm ${
                          isDark 
                            ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black" 
                            : "border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div>
              <p className={`text-sm mb-2 ${
                isDark ? "text-yellow-400/70" : "text-gray-600"
              }`}>
                Reset all progress, streaks, and stored data.
              </p>
              <Button
                onClick={resetAllData}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white backdrop-blur-sm"
              >
                Reset All Data
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-semibold mb-3 ${
            isDark ? "text-yellow-300" : "text-gray-700"
          }`}>
            About
          </h3>
          <div className={`text-sm space-y-2 ${
            isDark ? "text-yellow-400/70" : "text-gray-600"
          }`}>
            <p><strong>Islamic Tracker</strong></p>
            <p>Created by: Omanikaka Studios x Himaar fc</p>
            <p>Credits to: Aazif Inc.</p>
            <p>Version: 1.0.0</p>
            <p>Track your Islamic studies, prayers, and academic progress.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
