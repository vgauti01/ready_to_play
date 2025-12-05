import { useThree } from '@react-three/fiber';
import { forwardRef, useImperativeHandle } from 'react';
import { Color } from 'three';

/**
 * Interface pour les propriétés du composant CaptureScene accessible via la référence.
 * @interface CaptureSceneHandle
 * @property {() => string} captureScene - Fonction pour capturer la scène et retourner un data URL de l'image.
 */
export interface CaptureSceneHandle {
  captureScene: () => string;
}

/**
 * Composant CaptureScene
 * Permet de capturer la scène 3D et de retourner un data URL de l'image.
 * Il utilise une référence pour accéder à l'objet cible dont la scène doit être capturée.
 *
 * @param {CaptureSceneProps} props - Les propriétés du composant CaptureScene.
 * @param {React.Ref<CaptureSceneHandle>} ref - La référence pour accéder aux méthodes du composant.
 * @returns {JSX.Element} Le composant CaptureScene.
 */
export const CaptureScene = forwardRef<CaptureSceneHandle>(({}, ref) => {
  // Access aux objets de la scène via le hook useThree (obligatoirement dans un enfant de Canvas, ne peut donc pas être utilisé dans Scene.tsx)
  const { gl, scene, camera } = useThree();

  /**
   * Expose la méthode captureScene via la référence.
   * Cette méthode permet de capturer la scène et de retourner un data URL de l'image.
   * useImperativeHandle est utilisé pour exposer des méthodes spécifiques à ce composant.
   * Sans
   */
  useImperativeHandle(ref, () => ({
    captureScene,
  }));

  /**
   * Capture la scène 3D actuelle et génère une image JPEG.
   * @returns {string} Data URL de l'image capturée au format JPEG
   *
   * @note Les valeurs de rotation (-1.24, 0, -0.92) correspondent à une vue
   *       isométrique optimale pour la visualisation des palettes 3D
   * @note Cette capture est synchrone et peut causer un léger blocage sur des scènes complexes
   */
  const captureScene = () => {
    // 1. Sauvegarder le fond actuel (s'il y en a un)
    const originalBackground = scene.background;

    // 2. Appliquer la couleur voulue pour la vignette (ex: Gris clair style Décathlon)
    // On force un fond opaque juste pour la photo
    scene.background = new Color('#F4F5F7');

    // 3. Rendu manuel (votre code)
    gl.render(scene, camera);

    // 5. Remettre le fond comme avant (transparent ou autre)

    // Rendu manuel de la scène avec la caméra actuelle
    // Bypass le loop de rendu normal de React Three Fiber
    gl.render(scene, camera);

    // Extraction de l'image du canvas WebGL au format JPEG
    const dataURL = gl.domElement.toDataURL('image/jpeg', 2);
    scene.background = originalBackground;

    return dataURL;
  };

  return <></>;
});
CaptureScene.displayName = 'CaptureScene';
