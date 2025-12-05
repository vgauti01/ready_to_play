import type { Metadata } from 'next';
// Import des polices Google via Next.js
import { Outfit } from 'next/font/google';

import './globals.css';
import TransitionProvider from '@/components/TransitionProvider';
import { SessionProvider } from '@/context/SessionContext';

// Configuration de la police
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ready to Play? - Santé Posturale',
  description: "Connectez l'informatique au sport pour prévenir les blessures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      {/* On injecte les variables CSS des polices dans le body */}
      <body className={`${outfit.variable} font-sans antialiased`}>
        {/* On enveloppe les enfants (les pages) avec notre transition */}
        <SessionProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
