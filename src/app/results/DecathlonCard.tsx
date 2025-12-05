import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { movementsLibrary } from '../../data/movements';

import { useSession } from '@/context/SessionContext';

const DecathlonCard = ({
  move,
  isTopMatch,
}: {
  move: (typeof movementsLibrary)[0];
  isTopMatch: boolean;
}) => {
  const router = useRouter();
  const { selectedExercises, toggleExercise } = useSession();
  const isSelected = selectedExercises.some((e) => e.id === move.id);

  return (
    <div
      onClick={() => {
        router.push(`/exercise/${move.id}`);
      }}
      className={`
      relative flex flex-col bg-white rounded-2xl overflow-hidden border-2 border-transparent transition-all duration-200
      hover:border-decathlon-primary hover:-translate-y-1 hover:shadow-lg cursor-pointer
      ${move.isWarning ? 'opacity-90 grayscale' : ''}
    `}
    >
      {/* 1. Image Area */}
      <div className="relative h-48 bg-gray-100">
        {/* Placeholder image */}
        <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-200 text-gray-400">
          <Image
            src={`/images/thumbnails/${move.id}.jpg`}
            alt={move.title}
            fill
            className="object-cover object-center"
          />
        </div>

        {/* BOUTON SELECTION (Overlay) */}
        <button
          onClick={(e) => {
            e.preventDefault(); // Empêche d'ouvrir la page détail
            e.stopPropagation(); // Empêche la propagation au div parent
            toggleExercise(move);
          }}
          className={`absolute top-2 right-2 z-20 p-2 rounded-full shadow-md transition-all ${
            isSelected
              ? 'bg-decathlon-primary text-white ring-2 ring-white'
              : 'bg-white text-gray-400 hover:text-decathlon-primary'
          } cursor-pointer`}
        >
          {isSelected ? (
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>

        {/* Badge "TOP CHOIX" style étiquette jaune promo */}
        {isTopMatch && (
          <div className="absolute top-0 left-0 bg-decathlon-highlight italic text-slate-900 text-xs font-black px-3 py-1 uppercase tracking-wider">
            Recommandé
          </div>
        )}

        {/* Badge Warning */}
        {move.isWarning && (
          <div className="absolute top-0 left-0 bg-red-600 italic text-white text-xs font-bold px-2 py-1 uppercase">
            Déconseillé
          </div>
        )}
      </div>

      {/* 2. Content Area */}
      <div className="p-4 flex flex-col flex-1">
        {/* Catégorie discrète */}
        <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">
          {move.category[0]}
        </span>

        {/* Titre */}
        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2">
          {move.title}
        </h3>

        {/* Description courte */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
          {move.description}
        </p>
      </div>
    </div>
  );
};

export default DecathlonCard;
