'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { questions } from '../../data/questions';
import { movementsLibrary } from '../../data/movements';
import SessionBar from './SessionBar';
import DecathlonCard from './DecathlonCard';

const getLabel = (questionId: string, value: string) => {
  const question = questions.find((q) => q.id === questionId);
  const option = question?.options.find((o) => o.value === value);
  return option
    ? { label: option.label, icon: option.icon }
    : { label: value, icon: '•' };
};

type AnswersType = {
  niveau: string;
  sport: string;
  objectif: string;
  zone_sensible: string;
};

const DecathlonResultsPage = () => {
  const router = useRouter();
  const [userAnswers, setUserAnswers] = useState<AnswersType | null>();

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const stored = localStorage.getItem('userProfile');
    if (!stored) {
      void router.push('/');
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const parsed: AnswersType = JSON.parse(stored);
      setUserAnswers(parsed);
    } catch (error) {
      console.error('Impossible de lire userProfile', error);
      void router.push('/');
    }
  }, [router]);

  if (!userAnswers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-decathlon-light text-decathlon-primary font-bold">
        Chargement de vos résultats...
      </div>
    );
  }

  // 1. CALCUL DES SCORES
  const processedMovements = movementsLibrary
    .map((move) => {
      let score = 0;
      let isWarning = false;

      // Pénalité Douleur (Critique)
      if (
        userAnswers.zone_sensible !== 'none' &&
        move.painAvoid.includes(userAnswers.zone_sensible)
      ) {
        isWarning = true;
        score -= 50;
      }

      // Bonus Sport / Objectif / Niveau
      if (move.category.includes(userAnswers.sport)) score += 2;
      if (move.category.includes(userAnswers.objectif)) score += 3;
      if (move.level.includes(userAnswers.niveau)) score += 1;

      // Bonus "Pain Friendly" (Rééducation)
      if (
        userAnswers.zone_sensible !== 'none' &&
        move.painFriendly.includes(userAnswers.zone_sensible)
      )
        score += 5;

      // Seuil de recommandation (ex: score >= 3 et pas de warning)
      const isRecommended = score >= 3 && !isWarning;

      return { ...move, score, isWarning, isRecommended };
    })
    .toSorted((a, b) => b.score - a.score);

  // 2. SEPARATION DES LISTES
  const recommendedList = processedMovements.filter((m) => m.isRecommended);
  const otherList = processedMovements.filter((m) => !m.isRecommended);

  // LOGIQUE D'AFFICHAGE : Si aucun recommandé, on affiche tout dans une seule liste
  const showSeparatedLists = recommendedList.length > 0;

  // Récupération des labels pour le header
  const sportLabel = getLabel('sport', userAnswers.sport);
  const goalLabel = getLabel('objectif', userAnswers.objectif);

  return (
    <div className="min-h-screen bg-decathlon-light font-sans text-slate-900">
      {/* --- HEADER DECATHLON STYLE --- */}
      <header className="bg-decathlon-primary text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-1">
                MON PROGRAMME
              </h1>
              <p className="text-blue-100 text-sm font-medium">
                {userAnswers.niveau} &bull; {sportLabel.label} &bull;{' '}
                {goalLabel.label}
              </p>
            </div>

            {/* Tags Profil (Style filtres e-commerce) */}
            <div className="flex flex-wrap gap-2">
              {userAnswers.zone_sensible !== 'none' && (
                <Badge
                  text={`Attention: ${getLabel('zone_sensible', userAnswers.zone_sensible).label}`}
                  icon="⚠️"
                  isWarning
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {showSeparatedLists ? (
          <>
            {/* SECTION: LES INCONTOURNABLES (Recommandés) */}
            <div className="mb-10">
              <SectionTitle title="LES INCONTOURNABLES POUR VOUS" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recommendedList.map((move) => (
                  <DecathlonCard key={move.id} move={move} isTopMatch={true} />
                ))}
              </div>
            </div>

            {/* SECTION: LE CATALOGUE COMPLET */}
            <div>
              <SectionTitle title="COMPLÉTEZ VOTRE SÉANCE" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {otherList.map((move) => (
                  <DecathlonCard key={move.id} move={move} isTopMatch={false} />
                ))}
              </div>
            </div>
          </>
        ) : (
          // FALLBACK : AUCUN MATCH PARFAIT -> LISTE UNIQUE TRIÉE
          <div>
            <SectionTitle title="TOUS NOS EXERCICES DISPONIBLES" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {processedMovements.map((move) => (
                <DecathlonCard key={move.id} move={move} isTopMatch={false} />
              ))}
            </div>
          </div>
        )}
      </main>

      <SessionBar />
    </div>
  );
};

/* --- COMPOSANTS UI --- */

const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-6">
    <h2
      className={`font-black uppercase tracking-tight text-2xl text-decathlon-primary`}
    >
      {title}
    </h2>
  </div>
);

const Badge = ({
  text,
  icon,
  isWarning,
}: {
  text: string;
  icon: string;
  isWarning?: boolean;
}) => (
  <span
    className={`
    inline-flex items-center px-3 py-1 rounded text-xs font-bold uppercase tracking-wide bg-white
    ${isWarning ? 'text-red-600' : 'text-decathlon-primary'}
  `}
  >
    <span className="mr-1">{icon}</span> {text}
  </span>
);

export default DecathlonResultsPage;
