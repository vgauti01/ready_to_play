'use client';
import Link from 'next/link';

import { useSession } from '@/context/SessionContext';

const SessionBar = () => {
  const { selectedExercises } = useSession();

  if (selectedExercises.length === 0) return;

  return (
    <div className="fixed bottom-6 left-0 right-0 px-4 z-50 flex justify-center">
      <div className="bg-decathlon-dark text-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-6 animate-bounce-in">
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-none">
            {selectedExercises.length}
          </span>
          <span className="text-[10px] uppercase text-gray-400 font-bold">
            Exercices
          </span>
        </div>

        <div className="h-8 w-px bg-gray-700"></div>

        <div className="text-sm">
          <span className="text-gray-400">Durée : </span>
          <span className="font-bold text-white">
            {selectedExercises.length * 1} min {/* (45s+15s = 1min par exo) */}
          </span>
        </div>

        <Link
          href="/play"
          className="bg-decathlon-primary text-white font-black uppercase text-sm px-6 py-2 rounded-full transition-colors"
        >
          GO !
        </Link>
      </div>
    </div>
  );
};
export default SessionBar;
