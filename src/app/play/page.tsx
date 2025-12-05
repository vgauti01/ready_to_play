'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { LuPause, LuPlay, LuX } from 'react-icons/lu';

import AvatarViewer from '../../components/AvatarViewer';

import { useSession } from '@/context/SessionContext';

// CONFIGURATION DU TIMER
const WORK_TIME = 45;
const REST_TIME = 15;

export default function SessionPlayer() {
  const { selectedExercises } = useSession();
  const router = useRouter();

  // État du player
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('get_ready'); // 'get_ready', 'work', 'rest', 'finished'
  const [timeLeft, setTimeLeft] = useState(10); // 10s de préparation au début
  const [isActive, setIsActive] = useState(false);

  // Exercice courant
  const currentExercise = selectedExercises[currentIndex];
  const nextExercise = selectedExercises[currentIndex + 1];

  // LOGIQUE DU TIMER
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // LE TEMPS EST ÉCOULÉ : CHANGEMENT DE PHASE
      handlePhaseChange();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase]);

  const handlePhaseChange = () => {
    if (phase === 'get_ready' || phase === 'rest') {
      // On passe au travail
      setPhase('work');
      setTimeLeft(WORK_TIME);
    } else if (phase === 'work') {
      // On a fini l'exercice
      if (currentIndex + 1 < selectedExercises.length) {
        // S'il en reste, on passe au repos
        setPhase('rest');
        setTimeLeft(REST_TIME);
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Sinon c'est fini
        setPhase('finished');
        setIsActive(false);
      }
    }
  };

  // Sécurité : Si pas d'exos, retour accueil
  useEffect(() => {
    if (selectedExercises.length === 0) router.push('/results');
  }, [selectedExercises]);

  const togglePause = () => setIsActive(!isActive);

  // --- RENDU FIN DE SÉANCE ---
  if (phase === 'finished') {
    return (
      <div className="min-h-screen bg-decathlon-primary flex flex-col items-center justify-center text-white p-8 text-center">
        <h1 className="text-6xl font-black mb-4">BRAVO ! 🎉</h1>
        <p className="text-2xl mb-8">Séance terminée avec succès.</p>
        <button
          onClick={() => router.push('/')}
          className="bg-white text-decathlon-primary px-8 py-3 rounded-full font-bold uppercase"
        >
          Retour au programme
        </button>
      </div>
    );
  }

  if (!currentExercise) return;

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden">
      {/* HEADER : BARRE DE PROGRESSION */}
      <div className="h-2 bg-gray-800 w-full">
        <div
          className="h-full bg-decathlon-primary transition-all duration-1000"
          style={{
            width: `${(currentIndex / selectedExercises.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* --- ZONE PRINCIPALE (3D ou INFO REPOS) --- */}
      <div className="flex-1 relative flex flex-col h-full">
        {/* TITRE ET PHASE */}
        <div className="absolute top-0 left-0 right-0 p-6 z-10 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-wider">
                {currentExercise.title}
              </h2>
              <p
                className={`font-bold uppercase tracking-widest text-sm ${phase === 'work' ? 'text-green-400' : 'text-orange-400'}`}
              >
                {phase === 'work'
                  ? '🔥 En cours (Effort)'
                  : // eslint-disable-next-line unicorn/no-nested-ternary
                    phase === 'rest'
                    ? '💤 Récupération'
                    : 'Préparez-vous'}
              </p>
            </div>
            {/* TIMER GÉANT */}
            <div
              className={`text-6xl font-black font-mono ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}
            >
              {timeLeft}
              <span className="text-sm text-gray-400 block text-center font-sans -mt-2">
                sec
              </span>
            </div>
          </div>
        </div>

        {/* VISUEL */}
        <div className="flex-1 bg-gray-800 relative w-full h-full">
          {/* Si c'est la pause, on affiche "Prochain exercice" en floutant l'arrière plan */}
          {phase === 'rest' && (
            <div className="absolute inset-0 z-20 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-gray-400 uppercase font-bold text-sm mb-2">
                Prochain exercice
              </h3>
              <h2 className="text-4xl font-black italic mb-8">
                {currentExercise.title}
              </h2>
              <div className="text-6xl">💤 {timeLeft}</div>
            </div>
          )}

          {/* SCÈNE 3D TOUJOURS PRÉSENTE (Mais cachée si Rest) */}
          <Canvas
            camera={{ position: [0, 1.5, 2], fov: 50 }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[2, 5, 2]} />

            {/* On joue l'animation du mouvement en cours */}
            <AvatarViewer animationName={currentExercise.animationName} />

            <OrbitControls
              autoRotate={phase === 'work'}
              autoRotateSpeed={2}
              enableZoom={false}
            />
          </Canvas>
        </div>
      </div>

      {/* FOOTER : CONTRÔLES */}
      <div className="bg-white text-slate-900 p-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase">
              Série
            </span>
            <span className="font-bold text-xl">
              {currentIndex + 1} / {selectedExercises.length}
            </span>
          </div>

          {/* GROS BOUTON PLAY/PAUSE */}
          <button
            onClick={togglePause}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transform transition active:scale-95 ${isActive ? 'bg-orange-500' : 'bg-green-500'}`}
          >
            {isActive ? <LuPause /> : <LuPlay />}
          </button>

          {/* GROS BOUTON STOP (Retour aux résultats) */}
          <button
            onClick={() => router.push('/results')}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transform transition active:scale-95 bg-red-500"
          >
            <LuX />
          </button>

          <div className="flex flex-col items-end">
            {nextExercise && (
              <>
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Suivant
                </span>
                <span className="font-bold text-xl truncate">
                  {nextExercise.title}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
