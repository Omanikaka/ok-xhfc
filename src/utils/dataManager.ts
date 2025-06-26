
import jsPDF from 'jspdf';

export interface AppData {
  'daily-streak': number;
  'last-study-date': string;
  'streak-dates': string[];
  'study-progress': {
    "Fiqh": number;
    "Lisan ul Quran": number;
    "Thareeqh": number;
    "Duroos ul Ihsan": number;
  };
  'prayer-counts': {
    Fajr: number;
    Dhuhr: number;
    Asr: number;
    Maghrib: number;
    Isha: number;
  };
  'daily-prayers': {
    date: string;
    prayers: {
      Fajr: boolean;
      Dhuhr: boolean;
      Asr: boolean;
      Maghrib: boolean;
      Isha: boolean;
    };
  };
  'workout-count': number;
  'daily-study': {
    date: string;
    subjects: {
      English: boolean;
      Science: boolean;
      SSC: boolean;
      Hindi: boolean;
      Malayalam: boolean;
      Math: boolean;
    };
  };
  theme: string;
}

export const exportDataAsPDF = () => {
  const data = getAllData();
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text('Islamic Tracker - Data Export', 20, 20);
  
  // Export date
  doc.setFontSize(10);
  doc.text(`Exported on: ${new Date().toLocaleString()}`, 20, 30);
  
  let yPosition = 50;
  
  // Streak Data
  doc.setFontSize(14);
  doc.text('Study Streak', 20, yPosition);
  yPosition += 10;
  doc.setFontSize(10);
  doc.text(`Current Streak: ${data['daily-streak']} days`, 20, yPosition);
  yPosition += 5;
  doc.text(`Last Study Date: ${data['last-study-date']}`, 20, yPosition);
  yPosition += 5;
  doc.text(`Total Study Days: ${data['streak-dates'].length}`, 20, yPosition);
  yPosition += 15;
  
  // Study Progress
  doc.setFontSize(14);
  doc.text('Study Progress', 20, yPosition);
  yPosition += 10;
  doc.setFontSize(10);
  Object.entries(data['study-progress']).forEach(([subject, progress]) => {
    const totalChapters = subject === "Fiqh" ? 20 : subject === "Lisan ul Quran" ? 10 : subject === "Thareeqh" ? 17 : 14;
    doc.text(`${subject}: ${progress}/${totalChapters} chapters`, 20, yPosition);
    yPosition += 5;
  });
  yPosition += 10;
  
  // Prayer Counts
  doc.setFontSize(14);
  doc.text('Prayer Tracker', 20, yPosition);
  yPosition += 10;
  doc.setFontSize(10);
  Object.entries(data['prayer-counts']).forEach(([prayer, count]) => {
    doc.text(`${prayer}: ${count} prayers`, 20, yPosition);
    yPosition += 5;
  });
  yPosition += 10;
  
  // Workout Count
  doc.setFontSize(14);
  doc.text('Workout Tracker', 20, yPosition);
  yPosition += 10;
  doc.setFontSize(10);
  doc.text(`Total Workouts: ${data['workout-count']}`, 20, yPosition);
  yPosition += 15;
  
  // Data JSON (for import)
  doc.setFontSize(12);
  doc.text('Data for Import:', 20, yPosition);
  yPosition += 10;
  doc.setFontSize(8);
  const jsonData = JSON.stringify(data, null, 2);
  const lines = doc.splitTextToSize(jsonData, 170);
  doc.text(lines, 20, yPosition);
  
  doc.save('islamic-tracker-data.pdf');
};

export const getAllData = (): AppData => {
  const data: Partial<AppData> = {};
  
  // Get all localStorage keys
  const keys = [
    'daily-streak',
    'last-study-date', 
    'streak-dates',
    'study-progress',
    'prayer-counts',
    'daily-prayers',
    'workout-count',
    'daily-study',
    'theme'
  ] as const;
  
  keys.forEach(key => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        (data as any)[key] = JSON.parse(value);
      }
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
    }
  });
  
  return data as AppData;
};

export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    // Validate the data structure
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid data format');
    }
    
    // Import each piece of data
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};
