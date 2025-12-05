'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LuMoveLeft } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

import { questions } from '../../data/questions';

export default function DiagnosisPage() {
  const [currentStep, setCurrentStep] = useState(0); // Étape actuelle du QCM
  const [answers, setAnswers] = useState<Record<string, string>>({}); // Réponses de l'utilisateur
  const [direction, setDirection] = useState(0); // Pour savoir si on va à gauche ou droite
  const router = useRouter(); // Pour la navigation

  // Fonction pour passer à la question suivante
  const handleOptionClick = (value: string) => {
    const questionId = questions[currentStep].id;
    setAnswers({ ...answers, [questionId]: value });

    if (currentStep < questions.length - 1) {
      setDirection(1);
      setTimeout(() => setCurrentStep(currentStep + 1), 200); // Petit délai pour voir le clic
    } else {
      // Redirection vers les résultats
      const questionId = questions[currentStep].id;
      const finalAnswers = { ...answers, [questionId]: value };
      console.log('Formulaire terminé :', finalAnswers);
      localStorage.setItem('userProfile', JSON.stringify(finalAnswers));
      void router.push('/results');
    }
  };

  // Fonction pour revenir à la question précédente
  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    } else {
      void router.push('/');
    }
  };

  // --- CONFIGURATION ANIMATION FRAMER MOTION ---
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500, // Arrive de droite ou gauche
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500, // Part vers droite ou gauche
      opacity: 0,
    }),
  };

  // Calcul de la progression en pourcentage
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-decathlon-light flex flex-col overflow-hidden font-sans">
      {/* HEADER SIMPLE */}
      <header className="p-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-decathlon-primary font-bold text-xl tracking-tight"
        >
          DECATHLON <span className="text-decathlon-dark">DIAGNOSTIQUE</span>
        </Link>
        <div className="text-lg font-semibold text-gray-400">
          Étape {currentStep + 1}/{questions.length}
        </div>
      </header>

      {/* BARRE DE PROGRESSION */}
      <div className="w-full h-2 bg-gray-200">
        <motion.div
          className="h-full bg-decathlon-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* CONTENU CENTRAL (ANIMÉ) */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 relative">
        {/* AnimatePresence permet d'animer l'élément qui disparaît du DOM */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep} // La clé change = l'animation se déclenche
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-lg"
          >
            {/* Question */}
            <h2 className="text-3xl md:text-4xl font-bold text-decathlon-dark mb-8 text-center leading-tight">
              {questions[currentStep].question}
            </h2>

            {/* Options */}
            <div className="flex flex-col gap-4">
              {questions[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className="group flex items-center justify-between p-5 bg-white rounded-2xl border-2 border-transparent hover:border-decathlon-primary transition-all duration-200 text-left"
                >
                  <span className="text-lg font-medium text-gray-700 group-hover:text-decathlon-primary">
                    {option.label}
                  </span>
                  <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">
                    {option.icon}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bouton Retour */}
        <button
          onClick={handleBack}
          className="absolute bottom-10 text-xl left-6 text-gray-400 hover:text-decathlon-dark transition-colors flex items-center gap-2"
        >
          <LuMoveLeft /> Retour
        </button>
      </div>
    </main>
  );
}
