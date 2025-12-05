// src/components/TransitionProvider.jsx
'use client'; // Indispensable pour utiliser les hooks et framer-motion

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useContext, useRef } from 'react';

// Astuce : Pour que la page sortante ne "disparaisse" pas immédiatement
// on doit geler son contexte. C'est une petite astuce technique propre à Next.js
function FrozenRouter(props: React.PropsWithChildren) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;
  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const TransitionProvider = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // La clé est cruciale : elle dit à React "C'est une nouvelle page"
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="h-full w-full"
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
