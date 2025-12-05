import Image from 'next/image';
import Link from 'next/link';
import { LuMoveRight } from 'react-icons/lu';

export default function Home() {
  return (
    <main className="relative h-screen w-full flex flex-col justify-end pb-20 md:justify-center md:pb-0 bg-decathlon-dark overflow-hidden">
      {/* --- 1. LOGO --- */}
      <div className="absolute top-6 left-6 z-30">
        <Image
          src="/logo.png"
          alt="Logo"
          width={160}
          height={48}
          className="object-contain object-left opacity-80"
          priority
        />
      </div>

      {/* --- 2. IMAGE FULL SCREEN --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/prismond.jpg"
          alt="Athlète focus"
          fill
          className="object-cover object-center opacity-80"
          priority
        />
        {/* Gradient moderne : Transparent en haut -> Bleu foncé en bas */}
        <div className="absolute inset-0 bg-gradient-to-t from-decathlon-primary/70 via-decathlon-dark/20 to-transparent"></div>
      </div>

      {/* --- 3. CONTENU (Aligné gauche) --- */}
      <div className="relative z-20 px-6 md:px-20 max-w-5xl w-full">
        <h1 className="text-white text-6xl md:text-8xl font-extrabold leading-[0.9] tracking-tight mb-6">
          READY <br /> TO PLAY?
        </h1>

        <p className="text-gray-200 text-lg md:text-xl max-w-lg mb-10 font-medium">
          La technologie au service de votre posture. <br />
          Diagnostiquez, corrigez, performez.
        </p>

        {/* Bouton Style Arrondi*/}
        <Link href="/diagnosis">
          <button className="bg-white text-decathlon-primary hover:bg-decathlon-primary hover:text-decathlon-light transition-all duration-300 font-bold text-lg py-4 px-10 rounded-full shadow-lg hover:shadow-decathlon-primary/50 flex items-center gap-3">
            Démarrer le diagnostic
            <LuMoveRight size={25} />
          </button>
        </Link>
      </div>
    </main>
  );
}
