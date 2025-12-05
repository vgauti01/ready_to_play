'use client';
import { createContext, useContext, useState } from 'react';

import { Movement } from '@/data/movements';

type SessionContextType = {
  selectedExercises: Movement[];
  toggleExercise: (exercise: Movement) => void;
  clearSession: () => void;
};

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [selectedExercises, setSelectedExercises] = useState<Movement[]>([]);

  const toggleExercise = (exercise: Movement) => {
    setSelectedExercises((prev) => {
      const exists = prev.find((e) => e.id === exercise.id);
      return exists
        ? prev.filter((e) => e.id !== exercise.id)
        : [...prev, exercise];
    });
  };

  const clearSession = () => setSelectedExercises([]);

  return (
    <SessionContext.Provider
      value={{ selectedExercises, toggleExercise, clearSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used inside a SessionProvider');
  }
  return context;
};
