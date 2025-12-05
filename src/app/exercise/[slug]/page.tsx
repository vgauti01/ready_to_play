'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { LuMoveLeft } from 'react-icons/lu';

import AvatarViewer from '../AvatarViewer';
import DecathlonProductCard from '../ProductCard';
import { getRecommendedProducts } from '../products';

import { movementsLibrary } from '@/app/results/data';

const ExerciseDetailPage = () => {
  const { slug } = useParams();
  const move = movementsLibrary.find((m) => m.id === slug);

  if (!move) return <div className="p-10">Exercice introuvable</div>;

  const relatedProducts = getRecommendedProducts(move);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col lg:flex-row">
      {/* =========================================================
          ZONE GAUCHE : IMMERSION 3D (Sticky sur Desktop)
      ========================================================= */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen lg:sticky lg:top-0 bg-[#F4F5F7] relative order-1">
        {/* Bouton Retour Flottant */}
        <Link
          href="/results"
          className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-decathlon-primary flex flex-row items-center gap-2 shadow-sm hover:shadow-md transition"
        >
          <LuMoveLeft /> RETOUR
        </Link>

        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-gray-400">
              Chargement 3D...
            </div>
          }
        >
          <Canvas camera={{ position: [2, 1, 4], fov: 40 }} shadows>
            <color attach="background" args={['#F4F5F7']} />
            /app/results/data';
            {/* Éclairage Studio Doux */}
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[5, 10, 5]}
              intensity={1.5}
              castShadow
            />
            <spotLight position={[-5, 5, 2]} intensity={1} angle={0.5} />
            <Environment preset="city" />
            {/* Modèle */}
            <group position={[0, 0, 0]}>
              <AvatarViewer animationName={move.animationName} />
              {/* Ombre au sol pour ancrer le perso */}
              <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} />
            </group>
            <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </Suspense>

        {/* Badge 3D */}
        <div className="absolute bottom-6 right-6 bg-white/80 px-3 py-1 rounded text-xs font-bold uppercase text-slate-500 tracking-wider">
          Modèle Interactif
        </div>
      </div>

      {/* =========================================================
          ZONE DROITE : CONTENU & ARTICLES (Scrollable)
      ========================================================= */}
      <div className="w-full lg:w-1/2 min-h-screen bg-white order-2 flex flex-col">
        <div className="p-8 lg:p-16 max-w-2lg mx-auto w-full flex flex-col justify-center h-full">
          {/* --- HEADER CONTENU --- */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {move.category.map((cat) => (
                <span
                  key={cat}
                  className="text-[11px] font-black uppercase tracking-widest text-decathlon-primary bg-decathlon-primary/10 px-2 py-1 rounded-sm"
                >
                  {cat}
                </span>
              ))}
              {move.level.map((lvl) => (
                <span
                  key={lvl}
                  className="text-[11px] font-black uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-1 rounded-sm"
                >
                  {lvl}
                </span>
              ))}
            </div>

            <h1 className="text-5xl lg:text-6xl font-black uppercase italic leading-none text-slate-900">
              {move.title}
            </h1>

            {move.isWarning && (
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded mb-6">
                <span className="text-xl">⚠️</span>
                <p className="text-sm font-bold leading-tight">
                  Attention : Déconseillé si douleur (
                  {move.painAvoid.join(', ')})
                </p>
              </div>
            )}
          </div>

          {/* --- DESCRIPTION --- */}
          <div className="prose prose-lg prose-slate">
            <div className="flex items-center gap-2 mb-8">
              <span className="bg-[#FFEA28] text-slate-900 p-1 rounded-sm">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </span>
              <h2 className="text-xl font-black uppercase italic tracking-tight">
                Les Conseils du Coach
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {move.description} <br />
              Gardez le dos droit, regardez devant vous. Respirez calmement
              pendant l'effort. N'oubliez pas de vous hydrater entre chaque
              série.
            </p>
          </div>

          {/* --- SECTION "POUR ALLER PLUS LOIN" (ARTICLES) --- */}
          <div>
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-decathlon-primary text-white p-2 rounded">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-900">
                    S'équiper pour progresser
                  </h2>
                  <p className="text-sm text-gray-500">
                    Les indispensables recommandés pour cet exercice.
                  </p>
                </div>
              </div>

              {/* Grille de Produits */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.length > 0 ? (
                  relatedProducts.map((product) => (
                    <DecathlonProductCard key={product.id} product={product} />
                  ))
                ) : (
                  // Fallback générique si aucun produit spécifique trouvé
                  <p className="col-span-full text-gray-500 italic">
                    Aucun équipement spécifique requis pour cet exercice (Poids
                    du corps).
                  </p>
                )}
              </div>

              {/* Lien global */}
              <div className="mt-6 text-center">
                <a
                  href="https://www.decathlon.fr/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-sm font-bold text-decathlon-primary hover:underline"
                >
                  Voir tout le catalogue Fitness <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailPage;
