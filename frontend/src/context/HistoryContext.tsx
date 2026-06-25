import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface HistoryItem {
  id: string;
  name: string;
  mediaType: 'image' | 'video';
  prediction: 'REAL' | 'FAKE';
  confidence: number;
  processingTime: number;
  date: string;
  fileSize?: string;
  resolution?: string;
}

interface HistoryContextType {
  history: HistoryItem[];
  addHistoryItem: (item: Omit<HistoryItem, 'id' | 'date'>) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const SEED_HISTORY: HistoryItem[] = [
  {
    id: '1',
    name: 'profile_interview_deepfake.mp4',
    mediaType: 'video',
    prediction: 'FAKE',
    confidence: 98.43,
    processingTime: 1.84,
    date: '2026-06-25 14:20',
    fileSize: '14.2 MB',
    resolution: '1920x1080'
  },
  {
    id: '2',
    name: 'executive_portrait_real.jpg',
    mediaType: 'image',
    prediction: 'REAL',
    confidence: 99.12,
    processingTime: 0.08,
    date: '2026-06-25 11:05',
    fileSize: '1.2 MB',
    resolution: '1200x1200'
  },
  {
    id: '3',
    name: 'presidential_address_clip.mp4',
    mediaType: 'video',
    prediction: 'FAKE',
    confidence: 94.67,
    processingTime: 2.11,
    date: '2026-06-24 18:45',
    fileSize: '24.8 MB',
    resolution: '1280x720'
  },
  {
    id: '4',
    name: 'news_anchor_closeup.jpg',
    mediaType: 'image',
    prediction: 'REAL',
    confidence: 96.50,
    processingTime: 0.07,
    date: '2026-06-24 09:12',
    fileSize: '840 KB',
    resolution: '1080x1080'
  },
  {
    id: '5',
    name: 'social_media_celebrity_ad.mp4',
    mediaType: 'video',
    prediction: 'FAKE',
    confidence: 89.20,
    processingTime: 1.45,
    date: '2026-06-23 15:30',
    fileSize: '8.4 MB',
    resolution: '1080x1920'
  }
];

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const cached = localStorage.getItem('deeplens_history');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Failed to parse cached history:", e);
      }
    }
    return SEED_HISTORY;
  });

  useEffect(() => {
    localStorage.setItem('deeplens_history', JSON.stringify(history));
  }, [history]);

  const addHistoryItem = (item: Omit<HistoryItem, 'id' | 'date'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setHistory((prev) => [newItem, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addHistoryItem, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = (): HistoryContextType => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
