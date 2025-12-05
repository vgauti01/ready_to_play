import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

// Remplacez par le chemin réel vers votre fichier unique contenant toutes les anims
const MODEL_PATH = '/models/sophie.glb';

export default function AvatarViewer({
  animationName,
}: {
  animationName: string;
}) {
  const group = useRef(null);

  // 1. On charge le modèle et ses animations
  const { scene, animations } = useGLTF(MODEL_PATH);

  // 2. On prépare les animations
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // 3. Logique de lecture
    const action = actions[animationName];

    if (action) {
      // On reset l'anim, on la fond (fade) en 0.2s et on joue
      action.reset().fadeIn(0.2).play();
    } else {
      console.warn(`Animation "${animationName}" non trouvée dans le GLB.`);
    }

    // 4. Nettoyage : quand on change d'anim ou quitte, on fait un fondu de sortie
    return () => {
      if (action) action.fadeOut(0.2);
    };
  }, [actions, animationName]);

  return (
    <group ref={group} dispose={undefined}>
      {/* On peut ajuster l'échelle ou la position ici si le perso est trop haut/bas */}
      <primitive object={scene} scale={1} position={[0, -1, 0]} />
    </group>
  );
}

// Préchargement du modèle pour éviter l'écran noir au premier survol
useGLTF.preload(MODEL_PATH);
