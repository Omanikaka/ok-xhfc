
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTheme } from "@/hooks/useTheme";
import { useStorage } from "@/hooks/useStorage";

const subjects = ["English", "Science", "SSC", "Hindi", "Malayalam", "Math"];

export const AcademicsTable = () => {
  const { isDark } = useTheme();
  const [grades, setGrades] = useStorage("academic-grades", {} as Record<string, string>);
  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [tempGrade, setTempGrade] = useState("");

  const startEditing = (subject: string) => {
    setEditingSubject(subject);
    setTempGrade(grades[subject] || "");
  };

  const saveGrade = (subject: string) => {
    setGrades(prev => ({
      ...prev,
      [subject]: tempGrade
    }));
    setEditingSubject(null);
    setTempGrade("");
  };

  const cancelEditing = () => {
    setEditingSubject(null);
    setTempGrade("");
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${
      isDark ? "bg-black/50 border-yellow-400/20" : "bg-white border-gray-200"
    } shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? "text-yellow-400" : "text-gray-800"
      }`}>
        Academic Grades
      </h2>
      
      <Table>
        <TableHeader>
          <TableRow className={isDark ? "border-yellow-400/20" : "border-gray-200"}>
            <TableHead className={isDark ? "text-yellow-300" : "text-gray-700"}>
              Subject
            </TableHead>
            <TableHead className={isDark ? "text-yellow-300" : "text-gray-700"}>
              Grade
            </TableHead>
            <TableHead className={isDark ? "text-yellow-300" : "text-gray-700"}>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow 
              key={subject}
              className={isDark ? "border-yellow-400/20" : "border-gray-200"}
            >
              <TableCell className={`font-medium ${
                isDark ? "text-yellow-300" : "text-gray-700"
              }`}>
                {subject}
              </TableCell>
              <TableCell>
                {editingSubject === subject ? (
                  <Input
                    value={tempGrade}
                    onChange={(e) => setTempGrade(e.target.value)}
                    className={`w-20 ${
                      isDark 
                        ? "bg-black/50 border-yellow-400/30 text-yellow-300" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                    placeholder="A+"
                  />
                ) : (
                  <span className={isDark ? "text-yellow-400" : "text-gray-800"}>
                    {grades[subject] || "-"}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {editingSubject === subject ? (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => saveGrade(subject)}
                      className={`${
                        isDark 
                          ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                          : "bg-gray-800 text-white hover:bg-gray-900"
                      }`}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={cancelEditing}
                      className={`${
                        isDark 
                          ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black" 
                          : "border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(subject)}
                    className={`${
                      isDark 
                        ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black" 
                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
